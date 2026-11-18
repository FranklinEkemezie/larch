<?php

it('renders the welcome email', function () {
    $html = view('mail.welcome', ['name' => 'Ada Nwosu'])->render();

    expect($html)
        ->toContain('Welcome to Larch')
        ->toContain('Ada Nwosu')
        ->toContain(url('/'));
});

it('renders the password reset email with the reset link and expiry', function () {
    $url = url('/reset-password/example-token');

    $html = view('mail.password-reset', [
        'name' => 'Ada Nwosu',
        'url' => $url,
        'expiresIn' => 30,
    ])->render();

    expect($html)
        ->toContain('Reset your password')
        ->toContain($url)
        ->toContain('30 minutes');
});
