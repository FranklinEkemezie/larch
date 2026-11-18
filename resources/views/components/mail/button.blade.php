@props(['href'])

<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0 12px;">
    <tr>
        <td class="email-button" style="border-radius: 8px; background-color: #2f6b4a;">
            <a href="{{ $href }}" style="display: inline-block; padding: 12px 22px; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; line-height: 1.2; color: #ffffff; text-decoration: none; border-radius: 8px;">
                {{ $slot }}
            </a>
        </td>
    </tr>
</table>
