<?php

use App\Http\Controllers\LeadController;
use App\Http\Controllers\LeadStatusController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;

Route::get('/', function () {
    return view('welcome');
});

Route::resources([
    'leads' => LeadController::class,
    'lead_statuses' => LeadStatusController::class
]);


