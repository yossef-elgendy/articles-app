<?php

namespace App\Http\Controllers\Articles;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticlesController extends Controller
{
    public function index(Request $request, String $apiType) {
        try {
            $service = Article::API_TYPE[$apiType];
            $resource = Article::API_RESOURCE[$apiType];
            $articleProviderPath = "App\\Services\\Articles\\$service";
            $articleResourcePath = "App\\Http\\Resources\\Articles\\$resource";
            $articleProvider = new $articleProviderPath();

            $articles = $articleProvider->getArticles($request);
            $articlesResource = new $articleResourcePath($articles);

            $transformedArray = $articlesResource->toArray($request);

            return response()->json([
                'articles' => $transformedArray
            ], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json([
                'articles' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }

    }
}
