<?php
namespace App\Contracts;
use Illuminate\Http\Request;

interface ArticleProvider
{
    public function getArticles(Request $request): array;
}
