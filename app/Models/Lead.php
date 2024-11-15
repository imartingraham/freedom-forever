<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Lead extends Model
{
    /** @use HasFactory<\Database\Factories\LeadFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * 
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'lead_status_id',
    ];

    /**
     * Transform the resource into an array.
     *
     * @return array
     */
    public function toArray()
    {
        $lead = parent::toArray();
        $lead['created_at'] = $this->created_at->format("d/m/Y");
        $lead['updated_at'] = $this->updated_at->format("d/m/Y");
        $lead['lead_status'] = $this->lead_status->name;
        return $lead;
    }

    public function lead_status(): BelongsTo
    {
        return $this->belongsTo(LeadStatus::class);
    }

    public static function search(?string $term, ?int $status, int $limit)
    {
        $pagedLeads = self::orderBy('created_at', 'desc');
        if($term){
            $column = str_contains($term, '@') ? 'email' : 'name';
            $pagedLeads->where($column, 'LIKE', '%'.$term.'%');
        }

        if($status){
            $pagedLeads->where('lead_status_id', $status);
        }

        return $pagedLeads->paginate($limit)->withQueryString();
    }
}
