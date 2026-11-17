<?php

namespace App\Models;

use App\Traits\ModelHasUuid;
use Database\Factories\GroupFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property User $user
 */
#[Fillable(['name'])]
class Group extends Model
{
    /** @use HasFactory<GroupFactory> */
    use HasFactory, ModelHasUuid;


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function entries(): BelongsToMany
    {
        return $this->belongsToMany(Entry::class);
    }
}
