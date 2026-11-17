<?php

use App\Http\Controllers\AuthenticatedSessionController;
use App\Http\Controllers\EntryController;
use App\Http\Controllers\GroupController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', fn () => Inertia::render('Home'))->name('home');

// Authentication
Route::middleware('guest')->group(function () {

    Route::get('/signup', [UserController::class, 'create'])->name('signup');
    Route::post('/signup', [UserController::class, 'store'])->name('signup.store');

    Route::get('/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login.store');

});

// Entries
Route::middleware('auth')->resource('entries', EntryController::class);

// Groups
Route::middleware('auth')->resource('groups', GroupController::class);
