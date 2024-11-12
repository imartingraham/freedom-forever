<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LeadStatus extends Model
{
    /** @use HasFactory<\Database\Factories\LeadStatusFactory> */
    use HasFactory;

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'name'
    ];

    public function leads(): HasMany
    {
        return $this->hasMany(Lead::class);
    }
}
