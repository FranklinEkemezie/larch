<?php

use App\Models\Entry;
use App\Models\Group;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('requires a signed in user to manage groups', function () {
    $this->get(route('groups.index'))->assertRedirect(route('login'));
});

it('lists only the signed in user groups', function () {
    $user = User::factory()->create();
    $group = Group::factory()->for($user)->create([
        'name' => 'Reading List',
    ]);
    $entry = Entry::factory()->for($user)->create();
    $group->entries()->attach($entry);

    Group::factory()->for(User::factory())->create([
        'name' => 'Someone else group',
    ]);

    $this->actingAs($user)
        ->get(route('groups.index'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('group/index')
            ->has('groups', 1)
            ->where('groups.0.id', $group->uuid)
            ->where('groups.0.name', 'Reading List')
            ->has('groups.0.entries', 1)
            ->where('groups.0.entries.0.id', $entry->uuid));
});

it('offers only the signed in user entries when creating a group', function () {
    $user = User::factory()->create();
    $own = Entry::factory()->for($user)->create();
    Entry::factory()->for(User::factory())->create();

    $this->actingAs($user)
        ->get(route('groups.create'))
        ->assertInertia(fn (Assert $page) => $page
            ->component('group/create')
            ->has('entries', 1)
            ->where('entries.0.id', $own->uuid));
});

it('creates a group with the selected entries', function () {
    $user = User::factory()->create();
    $entry = Entry::factory()->for($user)->create();

    $this->actingAs($user)
        ->post(route('groups.store'), [
            'name' => 'Backend Engineering',
            'entries' => [$entry->uuid],
        ])
        ->assertSessionHasNoErrors();

    $group = Group::query()->where('name', 'Backend Engineering')->firstOrFail();

    expect($group->user->is($user))->toBeTrue()
        ->and($group->entries)->toHaveCount(1)
        ->and($group->entries->first()->is($entry))->toBeTrue();
});

it('creates an empty group when no entries are selected', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('groups.store'), ['name' => 'Someday'])
        ->assertSessionHasNoErrors();

    $group = Group::query()->where('name', 'Someday')->firstOrFail();

    expect($group->entries)->toHaveCount(0);
});

it('requires a name to create a group', function () {
    $this->actingAs(User::factory()->create())
        ->from(route('groups.create'))
        ->post(route('groups.store'), ['name' => ''])
        ->assertRedirect(route('groups.create'))
        ->assertSessionHasErrors('name');
});

it('refuses to add another user entries to a group', function () {
    $user = User::factory()->create();
    $foreign = Entry::factory()->for(User::factory())->create();

    $this->actingAs($user)
        ->from(route('groups.create'))
        ->post(route('groups.store'), [
            'name' => 'Reading List',
            'entries' => [$foreign->uuid],
        ])
        ->assertSessionHasErrors();

    expect($foreign->fresh()->groups)->toHaveCount(0);
});

it('shows a group with its entries', function () {
    $user = User::factory()->create();
    $group = Group::factory()->for($user)->create(['name' => 'Reading List']);
    $entry = Entry::factory()->for($user)->create(['title' => 'Fluent Python']);
    $group->entries()->attach($entry);

    $this->actingAs($user)
        ->get(route('groups.show', $group))
        ->assertInertia(fn (Assert $page) => $page
            ->component('group/show')
            ->where('group.id', $group->uuid)
            ->where('group.name', 'Reading List')
            ->has('group.entries', 1)
            ->where('group.entries.0.id', $entry->uuid)
            ->where('group.entries.0.title', 'Fluent Python'));
});

it('does not expose another user group', function () {
    $group = Group::factory()->for(User::factory())->create();

    $this->actingAs(User::factory()->create())
        ->get(route('groups.show', $group))
        ->assertNotFound();
});

it('renames a group without losing its entries', function () {
    $user = User::factory()->create();
    $group = Group::factory()->for($user)->create(['name' => 'Old name']);
    $entry = Entry::factory()->for($user)->create();
    $group->entries()->attach($entry);

    $this->actingAs($user)
        ->put(route('groups.update', $group), [
            'name' => 'New name',
            'entries' => [$entry->uuid],
        ])
        ->assertRedirect(route('groups.show', $group));

    expect($group->fresh()->name)->toBe('New name')
        ->and($group->fresh()->entries)->toHaveCount(1)
        ->and($group->fresh()->entries->first()->is($entry))->toBeTrue();
});

it('adds an existing entry to a group', function () {
    $user = User::factory()->create();
    $group = Group::factory()->for($user)->create();
    $entry = Entry::factory()->for($user)->create();

    $this->actingAs($user)
        ->put(route('groups.update', $group), [
            'name' => $group->name,
            'entries' => [$entry->uuid],
        ]);

    expect($group->fresh()->entries->pluck('id')->all())->toBe([$entry->id]);
});

it('removes an entry from a group without deleting the entry', function () {
    $user = User::factory()->create();
    $group = Group::factory()->for($user)->create();
    $kept = Entry::factory()->for($user)->create();
    $removed = Entry::factory()->for($user)->create();
    $group->entries()->attach([$kept->id, $removed->id]);

    $this->actingAs($user)
        ->put(route('groups.update', $group), [
            'name' => $group->name,
            'entries' => [$kept->uuid],
        ]);

    expect($group->fresh()->entries->pluck('id')->all())->toBe([$kept->id]);
    $this->assertDatabaseHas('entries', ['id' => $removed->id]);
});

it('rejects an empty name when renaming a group', function () {
    $user = User::factory()->create();
    $group = Group::factory()->for($user)->create(['name' => 'Reading List']);

    $this->actingAs($user)
        ->from(route('groups.edit', $group))
        ->put(route('groups.update', $group), [
            'name' => '',
            'entries' => [],
        ])
        ->assertRedirect(route('groups.edit', $group))
        ->assertSessionHasErrors('name');

    expect($group->fresh()->name)->toBe('Reading List');
});

it('prevents another user renaming a group', function () {
    $group = Group::factory()->for(User::factory())->create(['name' => 'Reading List']);

    $this->actingAs(User::factory()->create())
        ->put(route('groups.update', $group), ['name' => 'Hijacked'])
        ->assertForbidden();

    expect($group->fresh()->name)->toBe('Reading List');
});

it('deletes a group but keeps its entries', function () {
    $user = User::factory()->create();
    $group = Group::factory()->for($user)->create();
    $entry = Entry::factory()->for($user)->create();
    $group->entries()->attach($entry);

    $this->actingAs($user)
        ->delete(route('groups.destroy', $group))
        ->assertRedirect(route('groups.index'));

    $this->assertDatabaseMissing('groups', ['id' => $group->id]);
    $this->assertDatabaseMissing('entry_group', ['group_id' => $group->id]);
    $this->assertDatabaseHas('entries', ['id' => $entry->id]);
});

it('prevents another user deleting a group', function () {
    $group = Group::factory()->for(User::factory())->create();

    $this->actingAs(User::factory()->create())
        ->delete(route('groups.destroy', $group))
        ->assertForbidden();

    $this->assertDatabaseHas('groups', ['id' => $group->id]);
});
