<x-mail.layout
    :preheader="'Your Larch account is ready.'"
    :title="'Welcome to Larch'"
>
    <x-mail.heading>Welcome to Larch</x-mail.heading>

    <x-mail.paragraph>Hi {{ $name }},</x-mail.paragraph>

    <x-mail.paragraph>
        Your account is ready. Entries keep the progress you log for books, courses and
        projects in one place, and groups let you put related entries side by side when you
        want to compare them.
    </x-mail.paragraph>

    <x-mail.button :href="url('/')">Open Larch</x-mail.button>

    <x-mail.paragraph :muted="true">
        You received this email because an account was created with this address.
    </x-mail.paragraph>
</x-mail.layout>
