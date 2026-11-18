@props(['preheader', 'title' => null])

<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <title>{{ $title ?? $preheader }}</title>
        <style>
            @media (prefers-color-scheme: dark) {
                .email-page { background-color: #101712 !important; }
                .email-card { background-color: #18221b !important; border-color: #2c3a2f !important; }
                .email-heading { color: #edf2ec !important; }
                .email-body { color: #c2cdc4 !important; }
                .email-muted { color: #98a79b !important; }
                .email-brand { color: #edf2ec !important; }
                .email-button { background-color: #4e8a66 !important; }
                .email-link { color: #9fc7ad !important; }
            }
        </style>
    </head>
    <body class="email-page" style="margin: 0; padding: 0; background-color: #f4f5f0; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;">
        <div style="display: none; max-height: 0; max-width: 0; overflow: hidden; opacity: 0; font-size: 1px; line-height: 1px; color: #f4f5f0;">
            {{ $preheader }}
        </div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f5f0;">
            <tr>
                <td align="center" style="padding: 32px 16px 40px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width: 560px;">
                        <tr>
                            <td style="padding: 0 4px 18px;">
                                <a href="{{ url('/') }}" class="email-brand" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 700; letter-spacing: -0.01em; color: #1f2d24; text-decoration: none;">
                                    Larch<span style="color: #4e8a66;">.</span>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td class="email-card" style="border: 1px solid #e1e6dc; border-radius: 14px; background-color: #ffffff; padding: 36px 32px;">
                                {{ $slot }}
                            </td>
                        </tr>
                        <tr>
                            <td class="email-muted" style="padding: 20px 4px 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-size: 12px; line-height: 1.5; color: #7a887d;">
                                Larch is a personal progress tracker for the things you are working through.
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
</html>
