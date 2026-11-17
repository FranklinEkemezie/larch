<?php

namespace App\Http\Resources;

use App\Models\Entry;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Entry
 */
class EntryResource extends JsonResource
{

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'        => $this['uuid'],
            'title'     => $this['title'],
            'unit'      => $this['unit'],
            'completed' => $this['completed'],
            'total'     => $this['total'],
            'createdAt' => $this['created_at'],
            'updatedAt' => $this['updated_at'],
        ];
    }
}
