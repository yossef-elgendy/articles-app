<?php

namespace App\Services\Articles;

use App\Contracts\ArticleProvider;
use Illuminate\Http\Request;
use GuzzleHttp\Client;


class TheGuardianArticleProvider implements ArticleProvider
{
    public function getArticles(Request $request): array
    {
        $apiUrl = env('TG_API_URL');
        $apiKey = env('TG_API_KEY');
        $query = [
            'q' => $request->query('q') ?? '',
            'order-by' => 'newest',
            'page' => ($request->query('page') ?? 0) + 1,
            'page-size' => 10,
            'api-key' => $apiKey
        ];

        $fq_values = $this->getFqValues($request->query('categories') ?? [],
            $request->query('authors') ?? [], $request->query('sources') ?? []);

        if ($fq_values['categories'] !== '') {
            $query['section'] = $fq_values['categories'];
        }

        if ($fq_values['authors'] !== '') {
            $query['q'] .= ' ' . $fq_values['authors'];
        }

        if ($fq_values['sources'] !== '') {
            $query['q'] .= ' ' . $fq_values['sources'];
        }

        $client = new Client();
        $response = $client->get($apiUrl, [
            'query' => $query
        ]);

        $responseData = json_decode($response->getBody(), true);

        return $responseData['response'];
    }

    public function getFqValues(array $categories, array $authors, array $sources) {
        $fq_category = urlencode(implode('|', $categories));
        $fq_authors = urlencode(implode(' ', $authors));
        $fq_sources = urlencode(implode(' ', $sources));

        return [
            'categories' => $fq_category,
            'authors' => $fq_authors,
            'sources' => $fq_sources
        ];
    }
}
