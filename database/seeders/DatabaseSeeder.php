<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * Model events are intentionally left enabled: the UUID route keys are
     * assigned by a `creating` model event.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Ada Nwosu',
            'email' => 'ada@larch.app',
            'password' => 'password',
        ]);

        $this->call([
            EntrySeeder::class,
            GroupSeeder::class,
        ]);
    }
}
