<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    /**
     * The api type that should be mapped to its service.
     *
     * @var array<string, string>
     */
    const API_TYPE = [
        'NewsApi' => 'NewsApiArticleProvider',
        'NytApi' => 'NytApiArticleProvider',
        'TG' => 'TheGuardianArticleProvider'
    ];

    /**
     * The api type that should be mapped to its service.
     *
     * @var array<string, string>
     */
    const API_RESOURCE = [
        'NewsApi' => 'NewsApiArticlesResource',
        'NytApi' => 'NytApiArticlesResource',
        'TG' => 'TheGuardianArticlesResource'
    ];
}
