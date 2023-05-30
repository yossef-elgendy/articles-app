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

        $client = new Client();
        $response = $client->get($apiUrl, [
            'query' => [
                'q' => $request->query('q') ?? '',
                'sort' => 'newest',
                'page' => 1,
                'api-key' => $apiKey
            ]
        ]);

        $responseData = json_decode($response->getBody(), true);

        return $responseData['response']['docs'];
    }
}
