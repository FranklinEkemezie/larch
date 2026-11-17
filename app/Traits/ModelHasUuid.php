<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait ModelHasUuid
{
    //

    public function getRouteKeyName(): string
    {
        return 'uuid';
    }

    protected static function bootModelHasUuid(): void
    {
        static::creating(function ($model) {
            if (empty($model->uuid)) {
                $model->uuid = (string) Str::uuid7();
            }
        });
    }

}
