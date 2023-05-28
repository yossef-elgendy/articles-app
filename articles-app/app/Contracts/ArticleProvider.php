<?php
namespace App\Contracts;

interface ArticleProvider
{
    public function getArticles(): array;
}
