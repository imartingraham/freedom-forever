<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

use App\Models\Lead;
use App\Models\LeadStatus;

it('returns the correct number of leads when limit is passed', function(){

    $leadStatuses = LeadStatus::factory()->count(3)->create();
    $leadStatuses->each(function ($status) {
        Lead::factory()->create(['lead_status_id' => $status->id]);
    });

    $leadData = Lead::search(null, null, 1);
    expect(count($leadData->items()))->toBe(1);
});

it('returns the correct number of leads when query is passed', function(){
    $leads = Lead::factory()->count(3)->create([
        'lead_status_id' => 1
    ]);
    $leadData = Lead::search($leads->first()->name, null, 100);
    expect(count($leadData->items()))->toBe(1);
});

it('returns the correct number of leads when passing status', function(){

    $leadStatuses = LeadStatus::factory()->count(3)->create();
    $leadStatuses->each(function ($status) {
        Lead::factory()->create(['lead_status_id' => $status->id]);
    });

    $leadData = Lead::search(null, $leadStatuses->first()->id, 100);
    expect(count($leadData->items()))->toBe(1);

});