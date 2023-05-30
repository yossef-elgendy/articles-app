<?php

namespace App\Services\Articles;

use App\Contracts\ArticleProvider;
use Illuminate\Http\Request;
use GuzzleHttp\Client;


class NytApiArticleProvider implements ArticleProvider
{
    public function getArticles(Request $request): array
    {
        $apiUrl = env('NYT_API_URL');
        $apiKey = env('NYT_API_KEY');
        $query = [
            'q' => $request->query('q') ?? '',
            'sort' => 'newest',
            'page' => $request->query('page') ?? 0 + 1,
            'api-key' => $apiKey
        ];

        $fq_values = $this->getFqValues($request->query('categories') ?? [],
            $request->query('authors') ?? [], $request->query('sources') ?? []);

        if ($fq_values !== "") {
            $query['fq'] = $fq_values;
        }

        $client = new Client();
        $response = $client->get($apiUrl, [
            'query' => $query
        ]);

        $responseData = json_decode($response->getBody(), true);

        return $responseData['response'];
    }

    public function getFqValues(array $categories, array $authors, array $sources) {
        $fq_category = urlencode('"'. implode('" "', $categories) . '"');
        $fq_authors = urlencode('"'. implode('" "', $authors) . '"');
        $fq_sources = urlencode('"'. implode('" "', $sources) . '"');
        $fq_values = "section_name:($fq_category) OR source:($fq_sources) OR byline:$fq_authors";

        return $fq_values;
    }
}
