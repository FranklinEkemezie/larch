<?php

use App\Models\Entry;
use App\Models\Group;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

uses(TestCase::class, RefreshDatabase::class);

it('uses uuids as route keys', function () {
    $user = User::factory()->create();
    $entry = Entry::factory()->for($user)->create();
    $group = Group::factory()->for($user)->create();

    expect($entry->uuid)->toBeString()
        ->and(Str::isUuid($entry->uuid))->toBeTrue()
        ->and($entry->getRouteKey())->toBe($entry->uuid)
        ->and($group->uuid)->toBeString()
        ->and(Str::isUuid($group->uuid))->toBeTrue()
        ->and($group->getRouteKey())->toBe($group->uuid)
        ->and($user->getRouteKey())->toBe($user->uuid);
});

it('does not expose internal ids in resource routes', function () {
    $user = User::factory()->create();
    $entry = Entry::factory()->for($user)->create();

    expect(route('entries.show', $entry))
        ->toContain($entry->uuid)
        ->not->toContain('/entries/'.$entry->id);
});
