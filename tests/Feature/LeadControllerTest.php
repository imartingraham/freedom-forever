<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Testing\RefreshDatabase;
uses(RefreshDatabase::class);

use App\Models\Lead;
use App\Models\LeadStatus;

it('returns a successful response', function() {

  $leadStatuses = LeadStatus::factory()->count(3)->create();
  $leadStatuses->each(function($status){
    Lead::factory()->create(['lead_status_id' => $status->id]);
  });
  $leads = Lead::orderBy('created_at', 'desc')->get();
  $response = $this->get('/leads');
  $response->assertStatus(200);
  $content = json_decode($response->content(), true);
  expect($content["data"])->toMatchArray($leads->toArray());
});

it('should return only one results with a status', function() {
  $leadStatuses = LeadStatus::factory()->count(3)->create();
  $leadStatuses->each(function($status){
    Lead::factory()->create(['lead_status_id' => $status->id]);
  });
  $status = $leadStatuses->first();
  $lead = Lead::where('lead_status_id', $status->id)->first();
  $response = $this->get('/leads?status=' . $status->id);
  $response->assertStatus(200);
  $content = json_decode($response->content(), true);
  expect($content["data"])->toMatchArray([$lead->toArray()]);
});

it('should return only one result when searching', function(){
  $leadStatuses = LeadStatus::factory()->count(3)->create();
  $leadStatuses->each(function($status, $i){
    Lead::factory()->create([
      'name' => "test$i",
      'lead_status_id' => $status->id
    ]);
  });
  $lead = Lead::where("name", "test0")->get()->first();
  $response = $this->get('/leads?query=est0');
  $response->assertStatus(200);
  $content = json_decode($response->content(), true);
  expect($content["data"])->toMatchArray([$lead->toArray()]);
});