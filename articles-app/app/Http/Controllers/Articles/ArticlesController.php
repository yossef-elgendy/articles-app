<?php

namespace App\Http\Controllers\Articles;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\Articles\NewsApiArticleProvider;
use App\Services\Articles\NytApiArticleProvider;
use Illuminate\Http\Request;

class ArticlesController extends Controller
{
    public function index(Request $request, String $apiType) {
        $service = User::API_TYPE[$apiType];
        $articleProviderPath = "App\\Services\\Articles\\$service";
        $articleProvider = new $articleProviderPath();
        //TODO continue fetching the articles
    }
}
