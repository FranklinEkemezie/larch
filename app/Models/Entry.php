<?php

namespace App\Models;

use App\Traits\ModelHasUuid;
use Database\Factories\EntryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property User $user
 * @property Collection<Group> $groups
 */
#[Fillable(['title', 'unit', 'completed', 'total'])]
class Entry extends Model
{
    /** @use HasFactory<EntryFactory> */
    use HasFactory, ModelHasUuid;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function groups(): BelongsToMany
    {
        return $this->belongsToMany(Group::class);
    }

}
