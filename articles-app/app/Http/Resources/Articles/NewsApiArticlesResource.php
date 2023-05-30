<?php

namespace App\Http\Resources\Articles;

use Illuminate\Http\Resources\Json\JsonResource;

class NewsApiArticlesResource extends JsonResource
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

        foreach ($this->resource as $article) {
            $transformedArticles[] = [
                'title' => $article['title'],
                'description' => $article['description'],
                'url' => $article['url'],
                'source' => $article['source']['name'],
                'author' => $article['author'],
            ];
        }

        return $transformedArticles;
    }
}
