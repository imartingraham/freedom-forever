<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

use App\Http\Requests\StoreLeadRequest;
use App\Http\Requests\UpdateLeadRequest;
use App\Models\Lead;

class LeadController extends Controller
{
    const CACHE_TIMEOUT = 500;
    const CACHE_KEY = 'all-leads';
    const DEFAULT_PAGE_LIMIT = 100;
    const MAX_PAGE_LIMIT = 1000;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $pagedLeads = Cache::tags([self::CACHE_KEY])->remember($this->getCacheKey($request), self::CACHE_TIMEOUT, function() use(&$request) {

            $query = $request->get('query');
            $status = $request->get('status');
            $limit = $this->getLimit($request->get('limit'));
            return Lead::search($query, $status, $limit);
        });

        return response()->json($pagedLeads);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLeadRequest $request)
    {
        //

        $lead = Lead::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'lead_status_id' => $request->lead_status_id
        ]);

        # Clear cache so the new lead will show up
        Cache::tags([self::CACHE_KEY])->flush();

        return response()->json([
            'message' => 'success'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLeadRequest $request, Lead $lead)
    {
        //
        $lead->name = $request->name;
        $lead->email = $request->email;
        $lead->phone = $request->phone;
        $lead->lead_status_id = $request->lead_status_id;
        $lead->save();
        # Clear cache so the new lead will show up
        Cache::tags([self::CACHE_KEY])->flush();

        return response()->json(['message' => 'success', 'lead' => $lead]);
    }

    private function getCacheKey($request) 
    {   
        $limit = $this->getLimit($request->get('limit'));
        return self::CACHE_KEY.'-'.$request->get('query').$request->get('status').$limit.$request->get('page');
    }

    private function getLimit($limit){
        if(!$limit){
            return self::DEFAULT_PAGE_LIMIT;
        }else if($limit > self::MAX_PAGE_LIMIT) {
            return self::MAX_PAGE_LIMIT;
        }
        return $limit;
    }
}
