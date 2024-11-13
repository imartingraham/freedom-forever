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