<?php

namespace App\Http\Resources\Articles;

use Illuminate\Http\Resources\Json\JsonResource;

class TheGuardianArticlesResource extends JsonResource
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

        foreach ($this->resource['results'] as $article) {
            $transformedArticles[] = [
                'title' => $article['webTitle'],
                'description' => $article['description'] ?? '',
                'url' => $article['webUrl'],
                'source' => $article['sectionName'],
            ];
        }

        return [
            'data' => $transformedArticles,
            'totalPages' => $this->resource['pages']
        ];
    }
}
