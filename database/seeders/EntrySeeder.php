<?php

namespace Database\Seeders;

use App\Models\Entry;
use App\Models\User;
use Illuminate\Database\Seeder;

class EntrySeeder extends Seeder
{
    /**
     * Titles, units, totals and completed values for the demo account.
     *
     * @var array<int, array{title: string, unit: string, total: int, completed: int}>
     */
    private const ENTRIES = [
        ['title' => 'Designing Data-Intensive Applications', 'unit' => 'Chapters', 'total' => 12, 'completed' => 7],
        ['title' => 'The Pragmatic Programmer', 'unit' => 'Chapters', 'total' => 9, 'completed' => 9],
        ['title' => 'Laravel Beyond CRUD', 'unit' => 'Chapters', 'total' => 14, 'completed' => 4],
        ['title' => 'Refactoring UI', 'unit' => 'Chapters', 'total' => 7, 'completed' => 7],
        ['title' => 'CS50 Introduction to Computer Science', 'unit' => 'Weeks', 'total' => 10, 'completed' => 6],
        ['title' => 'Advanced React Patterns', 'unit' => 'Lessons', 'total' => 18, 'completed' => 11],
        ['title' => 'TypeScript Deep Dive', 'unit' => 'Chapters', 'total' => 16, 'completed' => 3],
        ['title' => 'Database Design Fundamentals', 'unit' => 'Modules', 'total' => 8, 'completed' => 8],
        ['title' => 'System Design Primer', 'unit' => 'Chapters', 'total' => 20, 'completed' => 5],
        ['title' => 'The Linux Command Line', 'unit' => 'Chapters', 'total' => 24, 'completed' => 10],
        ['title' => 'Stanford Machine Learning', 'unit' => 'Weeks', 'total' => 12, 'completed' => 2],
        ['title' => 'Practical Statistics', 'unit' => 'Chapters', 'total' => 15, 'completed' => 0],
        ['title' => 'Fluent Python', 'unit' => 'Chapters', 'total' => 22, 'completed' => 13],
        ['title' => 'Build a SaaS with Laravel', 'unit' => 'Features', 'total' => 12, 'completed' => 9],
        ['title' => 'OWASP Top Ten', 'unit' => 'Topics', 'total' => 10, 'completed' => 4],
        ['title' => 'Mastering Postgres', 'unit' => 'Lessons', 'total' => 20, 'completed' => 0],
        ['title' => 'The Rust Book', 'unit' => 'Chapters', 'total' => 20, 'completed' => 6],
        ['title' => 'Docker Deep Dive', 'unit' => 'Chapters', 'total' => 14, 'completed' => 14],
        ['title' => 'The Art of Unit Testing', 'unit' => 'Chapters', 'total' => 12, 'completed' => 5],
        ['title' => 'Product Analytics Basics', 'unit' => 'Modules', 'total' => 6, 'completed' => 1],
        ['title' => 'Financial Planning Course', 'unit' => 'Lessons', 'total' => 9, 'completed' => 3],
        ['title' => 'Technical Writing Workshop', 'unit' => 'Exercises', 'total' => 16, 'completed' => 0],
    ];

    public function run(): void
    {
        $user = User::query()->firstOrFail();

        foreach (self::ENTRIES as $entry) {
            Entry::factory()
                ->for($user)
                ->create($entry);
        }
    }
}
