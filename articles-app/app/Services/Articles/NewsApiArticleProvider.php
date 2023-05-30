<?php

namespace App\Services\Articles;

use App\Contracts\ArticleProvider;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class NewsApiArticleProvider implements ArticleProvider
{
    public function getArticles(Request $request): array
    {
        $apiUrl = env('NEWS_API_URL');
        $apiKey = env('NEWS_API_KEY');
        $query = [
            'q' => $request->query('q') ?? 'default',
            'pageSize' => '10',
            'page' => $request->query('page') + 1,
            'sortBy' => 'publishedAt',
            'apiKey' => $apiKey
        ];

        $fq_values = $fq_values = $this->personalizeQueriesValue($request->query('categories') ?? [],
        $request->query('authors') ?? [], $request->query('sources') ?? []);

        // Category is not supported for this endpoint
        $query['author'] = $fq_values['author'] ?? '';
        $query['source'] = $fq_values['source'] ?? '';

        $client = new Client();
        $response = $client->get($apiUrl, [
            'query' => $query
        ]);

        $responseData = json_decode($response->getBody(), true);

        return $responseData;
    }

    public function personalizeQueriesValue(array $categories, array $authors, array $sources): array {
        return array(
            'category' => implode(',', $categories),
            'author' => implode(',', $authors),
            'source' => implode(',', $sources)
        );
    }
}
