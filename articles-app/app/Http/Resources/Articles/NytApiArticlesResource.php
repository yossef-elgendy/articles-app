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

        foreach ($this->resource as $article) {
            $transformedArticles[] = [
                'title' => $article['headline']['main'],
                'description' => $article['abstract'],
                'url' => $article['web_url'],
                'source' => $article['source'],
                'author' => $article['byline']['original'],
            ];
        }

        return $transformedArticles;
    }
}
