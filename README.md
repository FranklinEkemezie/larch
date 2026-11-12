# Larch

A quiet, offline-first progress tracker for entries and entry groups.

## Stack

| Area | Technology |
| --- | --- |
| Backend | Laravel 13.40, PHP 8.5 |
| Mobile runtime | NativePHP Mobile 4.7 (Android) |
| Frontend | Inertia.js 3.7, React 19.3, TypeScript 6.0 |
| Styling | Tailwind CSS 4.3, shadcn/ui, Lucide React, Inter Variable |
| Build | Vite 8.3, pnpm 12.18 |
| Database | SQLite |
| Tests | Pest 5.3, PHPUnit 13, Vitest 5, Testing Library |

## Requirements

- PHP 8.5.x
- Composer 2.8+
- Node.js 22.21.1 LTS
- pnpm 12.x
- Android SDK for native builds: platform 36, build-tools 36, platform-tools,
  NDK 27.0.12077973, CMake 3.22.1 (see **Android build** below)

## Setup

```sh
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
pnpm install
pnpm build
```

The SQLite database is created at `database/database.sqlite`.

## Development

```sh
php artisan serve
pnpm dev
```

## Tests

```sh
php artisan test      # Pest
pnpm test             # Vitest
pnpm typecheck        # TypeScript
```

## Android build

NativePHP regenerates the `nativephp/` directory, so it is not tracked by Git.
The Android SDK location is read from `NATIVEPHP_ANDROID_SDK_LOCATION` in
`.env` (currently `C:\Android\Sdk`).

Required Android SDK packages:

```sh
sdkmanager "platform-tools" "platforms;android-36" "build-tools;36.0.0" \
  "ndk;27.0.12077973" "cmake;3.22.1"
```

Build and run on a connected device or emulator:

```sh
php artisan native:install
php artisan native:run android
```

> The Android platform, build-tools, platform-tools, and NDK downloads are
> currently deferred. Everything needed for the Laravel + Inertia web
> application is installed and passing.
