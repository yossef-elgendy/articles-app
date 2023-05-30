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

        $client = new Client();
        $response = $client->get($apiUrl, [
            'headers' => [
                'Authorization' => 'Bearer ' . $apiKey,
            ],
            'query' => [
                'q' => $request->query('q') ?? 'default',
                'pageSize' => '10',
                'page' => 1,
                'sortBy' => 'publishedAt',
                'apiKey' => $apiKey
            ]
        ]);

        $responseData = json_decode($response->getBody(), true);

        return $responseData["articles"];
    }
}
