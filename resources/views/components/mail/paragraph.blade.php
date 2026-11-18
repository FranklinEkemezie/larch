@props(['muted' => false])

<p class="{{ $muted ? 'email-muted' : 'email-body' }}" style="margin: 0 0 16px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.65; color: {{ $muted ? '#7a887d' : '#46554b' }};">
    {{ $slot }}
</p>
