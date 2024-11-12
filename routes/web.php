<?php

use App\Http\Controllers\LeadController;
use App\Http\Controllers\LeadStatusController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;

Route::get('/', function () {
    return view('welcome');
});

Route::controller(LeadController::class)->group(function () {
    Route::get('/leads', 'index');
    Route::post('/leads', 'store');
    Route::put('/leads/{id}', 'update');
});

Route::controller(LeadStatusController::class)->group(function() {
    Route::get('/lead_statuses', 'index');
});

