<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\User\RegisterRequest;
use App\Http\Resources\User\UserDataResource;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function user()
    {
        return response()->json(['user' => auth()->user()], 200);
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json(['message' => 'Successfully logged out'], Response::HTTP_OK);
        } catch (\Exception $e){
            return response()->json(['message' => $e->getMessage()], Response::HTTP_BAD_GATEWAY);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = $request->user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'user' => new UserDataResource($user)
            ], Response::HTTP_OK);
        }

        return response()->json(['error' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
    }

    public function register(RegisterRequest $request)
    {
        try {
            $user = User::create([
                'username' => $request->input('username'),
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'authors' => $request->input('authors'),
                'sources' => $request->input('sources'),
                'categories' => $request->input('categories')
            ]);

            Auth::login($user);
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'access_token' => $token,
                'user' => new UserDataResource($user)
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json([
                'errors' => [$e->getMessage()]
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
