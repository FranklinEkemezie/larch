<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

it('shows the sign in page to guests', function () {
    $this->get(route('login'))->assertOk();
});

it('shows the sign up page to guests', function () {
    $this->get(route('signup'))->assertOk();
});

it('creates an account and signs the user in', function () {
    $this->post(route('signup.store'), [
        'name' => 'Ada Nwosu',
        'email' => 'ada@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertRedirect();

    $this->assertDatabaseHas('users', [
        'name' => 'Ada Nwosu',
        'email' => 'ada@example.com',
    ]);

    $this->assertAuthenticated();
});

it('requires a name, email and password to sign up', function () {
    $this->from(route('signup'))
        ->post(route('signup.store'), [])
        ->assertRedirect(route('signup'))
        ->assertSessionHasErrors(['name', 'email', 'password']);
});

it('rejects an email that already has an account', function () {
    User::factory()->create(['email' => 'ada@example.com']);

    $this->from(route('signup'))
        ->post(route('signup.store'), [
            'name' => 'Another Ada',
            'email' => 'ada@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])
        ->assertSessionHasErrors('email');
});

it('signs a user in with valid credentials', function () {
    $user = User::factory()->create(['password' => 'password']);

    $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect();

    $this->assertAuthenticatedAs($user);
});

it('rejects invalid credentials', function () {
    $user = User::factory()->create(['password' => 'password']);

    $this->from(route('login'))
        ->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'not-the-password',
        ])
        ->assertRedirect(route('login'))
        ->assertSessionHasErrors('email');

    $this->assertGuest();
});

it('shares the signed in user with the frontend', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->get(route('home'))
        ->assertInertia(fn (Assert $page) => $page
            ->where('auth.user.id', $user->uuid)
            ->where('auth.user.name', $user->name)
            ->where('auth.user.email', $user->email));
});

it('signs the user out', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post('/logout')
        ->assertRedirect(route('home'));

    $this->assertGuest();
});
