<?php

namespace Database\Seeders;

use App\Models\Entry;
use App\Models\Group;
use App\Models\User;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Group name => the entries that belong to it.
     *
     * @var array<string, array<int, string>>
     */
    private const GROUPS = [
        'First Semester' => [
            'CS50 Introduction to Computer Science',
            'Stanford Machine Learning',
            'Practical Statistics',
            'The Linux Command Line',
        ],
        'Backend Engineering' => [
            'Designing Data-Intensive Applications',
            'Laravel Beyond CRUD',
            'Build a SaaS with Laravel',
            'Mastering Postgres',
            'Database Design Fundamentals',
        ],
        'Frontend Craft' => [
            'Refactoring UI',
            'Advanced React Patterns',
            'TypeScript Deep Dive',
        ],
        'Reading List' => [
            'The Pragmatic Programmer',
            'Fluent Python',
            'The Rust Book',
            'The Art of Unit Testing',
            'Designing Data-Intensive Applications',
        ],
        'Q4 Learning Plan' => [
            'OWASP Top Ten',
            'Product Analytics Basics',
            'Docker Deep Dive',
        ],
        'Personal Finance' => [
            'Financial Planning Course',
        ],
        'Someday' => [],
    ];

    public function run(): void
    {
        $user = User::query()->firstOrFail();

        $entries = $user->entries()->get()->keyBy('title');

        foreach (self::GROUPS as $name => $titles) {
            /** @var Group $group */
            $group = Group::factory()->for($user)->create(['name' => $name]);

            $selected = $entries->filter(
                fn (Entry $entry): bool => in_array($entry->title, $titles, true)
            );

            $group->entries()->attach($selected->pluck('id')->all());
        }
    }
}
