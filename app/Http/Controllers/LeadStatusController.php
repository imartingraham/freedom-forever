<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadStatusRequest;
use App\Http\Requests\UpdateLeadStatusRequest;
use App\Models\LeadStatus;

class LeadStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $statuses = LeadStatus::all();
        return response()->json($statuses);
    }
}
