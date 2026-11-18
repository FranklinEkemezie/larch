<x-mail.layout
    :preheader="'Choose a new password for your Larch account.'"
    :title="'Reset your password'"
>
    <x-mail.heading>Reset your password</x-mail.heading>

    <x-mail.paragraph>Hi {{ $name }},</x-mail.paragraph>

    <x-mail.paragraph>
        We received a request to reset the password for your Larch account. Use the button
        below to choose a new one.
    </x-mail.paragraph>

    <x-mail.button :href="$url">Choose a new password</x-mail.button>

    <x-mail.paragraph :muted="true">
        The link expires in {{ $expiresIn ?? 60 }} minutes. If you did not request a reset,
        you can ignore this email — your password will stay the same.
    </x-mail.paragraph>

    <x-mail.paragraph :muted="true">
        If the button does not work, copy this link into your browser:
        <a href="{{ $url }}" class="email-link" style="color: #2f6b4a; text-decoration: underline; word-break: break-all;">{{ $url }}</a>
    </x-mail.paragraph>
</x-mail.layout>
