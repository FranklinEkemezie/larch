<?php

use App\Models\Entry;
use App\Models\Group;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('lets guests visit the home page', function () {
    $this->get(route('home'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Home'));
});

it('shows the signed in user entries and groups', function () {
    $user = User::factory()->create();
    $entry = Entry::factory()->for($user)->create(['title' => 'Fluent Python']);
    $group = Group::factory()->for($user)->create(['name' => 'Reading List']);

    Entry::factory()->for(User::factory())->create();
    Group::factory()->for(User::factory())->create();

    $this->actingAs($user)
        ->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('Home')
            ->has('entries', 1)
            ->where('entries.0.id', $entry->uuid)
            ->where('entries.0.title', 'Fluent Python')
            ->has('groups', 1)
            ->where('groups.0.id', $group->uuid)
            ->where('groups.0.name', 'Reading List'));
});
