<?php

namespace App\Http\Resources\Articles;

use Illuminate\Http\Resources\Json\JsonResource;

class NytApiArticlesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $transformedArticles = [];

        foreach ($this->resource['docs'] as $article) {
            $transformedArticles[] = [
                'title' => $article['headline']['main'],
                'description' => $article['abstract'],
                'url' => $article['web_url'],
                'source' => $article['source'],
                'author' => $article['byline']['original'],
            ];
        }

        return [
            'data' => $transformedArticles,
            'totalPages' => ceil($this->resource['meta']['hits'] / 10)
        ];
    }
}
