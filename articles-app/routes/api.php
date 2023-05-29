<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/customer/logout', [AuthController::class, 'logout']);
    Route::put('/customer/update', [AuthController::class, 'update']);
});

Route::post('/customer/login', [AuthController::class, 'login']);
Route::post('/customer/register', [AuthController::class, 'register']);
