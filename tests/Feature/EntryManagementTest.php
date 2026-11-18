<?php

use App\Models\Entry;
use App\Models\Group;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('requires a signed in user to manage entries', function () {
    $this->get(route('entries.index'))->assertRedirect(route('login'));
});

it('lists only the signed in user entries', function () {
    $user = User::factory()->create();

    $own = Entry::factory()->for($user)->create([
        'title' => 'Refactoring UI',
    ]);
    Entry::factory()->for(User::factory())->create([
        'title' => 'Someone else entry',
    ]);

    $this->actingAs($user)
        ->get(route('entries.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('entry/index')
            ->has('entries', 1)
            ->where('entries.0.id', $own->uuid)
            ->where('entries.0.title', 'Refactoring UI'));
});

it('shows an entry with the groups it belongs to', function () {
    $user = User::factory()->create();
    $entry = Entry::factory()->for($user)->create();
    $group = Group::factory()->for($user)->create();
    $entry->groups()->attach($group);

    $this->actingAs($user)
        ->get(route('entries.show', $entry))
        ->assertInertia(fn (Assert $page) => $page
            ->component('entry/show')
            ->where('entry.id', $entry->uuid)
            ->has('groups', 1)
            ->where('groups.0.id', $group->uuid));
});

it('does not expose another user entry', function () {
    $entry = Entry::factory()->for(User::factory())->create();

    $this->actingAs(User::factory()->create())
        ->get(route('entries.show', $entry))
        ->assertNotFound();
});

it('creates an entry for the signed in user', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('entries.store'), [
            'title' => 'Refactoring UI',
            'unit' => 'Chapters',
            'total' => 7,
            'completed' => 2,
        ])
        ->assertRedirect(route('entries.index'));

    $this->assertDatabaseHas('entries', [
        'user_id' => $user->id,
        'title' => 'Refactoring UI',
        'unit' => 'Chapters',
        'total' => 7,
        'completed' => 2,
    ]);
});

it('rejects invalid entries', function (array $payload, string $field) {
    $this->actingAs(User::factory()->create())
        ->from(route('entries.create'))
        ->post(route('entries.store'), $payload)
        ->assertSessionHasErrors($field);
})->with([
    'missing title' => [
        ['title' => '', 'unit' => 'Chapters', 'total' => 7],
        'title',
    ],
    'missing unit' => [
        ['title' => 'Refactoring UI', 'unit' => '', 'total' => 7],
        'unit',
    ],
    'zero total' => [
        ['title' => 'Refactoring UI', 'unit' => 'Chapters', 'total' => 0],
        'total',
    ],
    'completed above total' => [
        ['title' => 'Refactoring UI', 'unit' => 'Chapters', 'total' => 7, 'completed' => 8],
        'completed',
    ],
]);

it('updates an entry', function () {
    $user = User::factory()->create();
    $entry = Entry::factory()->for($user)->create([
        'title' => 'Old title',
    ]);

    $this->actingAs($user)
        ->put(route('entries.update', $entry), [
            'title' => 'New title',
            'unit' => 'Lessons',
            'total' => 10,
            'completed' => 4,
        ])
        ->assertRedirect(route('entries.index'));

    $entry->refresh();

    expect($entry->title)->toBe('New title')
        ->and($entry->unit)->toBe('Lessons')
        ->and($entry->total)->toBe(10.0)
        ->and($entry->completed)->toBe(4.0);
});

it('prevents updating another user entry', function () {
    $entry = Entry::factory()->for(User::factory())->create();

    $this->actingAs(User::factory()->create())
        ->put(route('entries.update', $entry), ['title' => 'Hijacked'])
        ->assertForbidden();
});

it('updates progress for the signed in user entry', function () {
    $user = User::factory()->create();
    $entry = Entry::factory()->for($user)->create([
        'total' => 20,
        'completed' => 4,
    ]);

    $this->actingAs($user)
        ->patch(route('entries.update', $entry), [
            'completed' => 6,
            'total' => 20,
        ])
        ->assertRedirect();

    expect($entry->fresh()->completed)->toBe(6.0);
});

it('rejects progress above the total', function () {
    $user = User::factory()->create();
    $entry = Entry::factory()->for($user)->create([
        'total' => 20,
        'completed' => 4,
    ]);

    $this->actingAs($user)
        ->patch(route('entries.update', $entry), [
            'completed' => 21,
            'total' => 20,
        ])
        ->assertSessionHasErrors('completed');

    expect($entry->fresh()->completed)->toBe(4.0);
});

it('rejects negative progress', function () {
    $user = User::factory()->create();
    $entry = Entry::factory()->for($user)->create([
        'total' => 20,
        'completed' => 4,
    ]);

    $this->actingAs($user)
        ->patch(route('entries.update', $entry), [
            'completed' => -1,
            'total' => 20,
        ])
        ->assertSessionHasErrors('completed');

    expect($entry->fresh()->completed)->toBe(4.0);
});

it('adds a new entry to the groups chosen in the form', function () {
    $user = User::factory()->create();
    $group = Group::factory()->for($user)->create();

    $this->actingAs($user)->post(route('entries.store'), [
        'title' => 'Refactoring UI',
        'unit' => 'Chapters',
        'total' => 7,
        'completed' => 0,
        'groups' => [$group->uuid],
    ]);

    $entry = Entry::query()->where('title', 'Refactoring UI')->firstOrFail();

    expect($entry->groups)->toHaveCount(1)
        ->and($entry->groups->first()->is($group))->toBeTrue();
});

it('deletes an entry and removes it from its groups', function () {
    $user = User::factory()->create();
    $entry = Entry::factory()->for($user)->create();
    $group = Group::factory()->for($user)->create();
    $entry->groups()->attach($group);

    $this->actingAs($user)
        ->delete(route('entries.destroy', $entry))
        ->assertRedirect(route('entries.index'));

    $this->assertDatabaseMissing('entries', ['id' => $entry->id]);
    $this->assertDatabaseMissing('entry_group', ['entry_id' => $entry->id]);
});

it('prevents deleting another user entry', function () {
    $entry = Entry::factory()->for(User::factory())->create();

    $this->actingAs(User::factory()->create())
        ->delete(route('entries.destroy', $entry))
        ->assertForbidden();

    $this->assertDatabaseHas('entries', ['id' => $entry->id]);
});
