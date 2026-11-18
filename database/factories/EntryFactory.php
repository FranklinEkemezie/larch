<?php

namespace Database\Factories;

use App\Models\Entry;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Entry>
 */
class EntryFactory extends Factory
{
    /**
     * Reasonably real things people track, paired with the unit they are
     * measured in.
     *
     * @var array<int, array{0: string, 1: string}>
     */
    private const TRACKABLES = [
        ['Designing Data-Intensive Applications', 'Chapters'],
        ['The Pragmatic Programmer', 'Chapters'],
        ['Laravel Beyond CRUD', 'Chapters'],
        ['Refactoring UI', 'Chapters'],
        ['CS50 Introduction to Computer Science', 'Weeks'],
        ['Advanced React Patterns', 'Lessons'],
        ['TypeScript Deep Dive', 'Chapters'],
        ['Database Design Fundamentals', 'Modules'],
        ['System Design Primer', 'Chapters'],
        ['The Linux Command Line', 'Chapters'],
        ['Stanford Machine Learning', 'Weeks'],
        ['Practical Statistics', 'Chapters'],
        ['Fluent Python', 'Chapters'],
        ['Build a SaaS with Laravel', 'Features'],
        ['OWASP Top Ten', 'Topics'],
        ['Mastering Postgres', 'Lessons'],
        ['The Rust Book', 'Chapters'],
        ['Docker Deep Dive', 'Chapters'],
        ['The Art of Unit Testing', 'Chapters'],
        ['Product Analytics Basics', 'Modules'],
        ['Financial Planning Course', 'Lessons'],
        ['Technical Writing Workshop', 'Exercises'],
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        [$title, $unit] = fake()->randomElement(self::TRACKABLES);
        $total = $this->totalFor($unit);

        return [
            'title' => $title,
            'unit' => $unit,
            'total' => $total,
            'completed' => fake()->numberBetween(0, $total),
        ];
    }

    public function notStarted(): static
    {
        return $this->state(fn (): array => ['completed' => 0]);
    }

    public function inProgress(): static
    {
        return $this->state(fn (array $attributes): array => [
            'completed' => fake()->numberBetween(1, max(1, (int) $attributes['total'] - 1)),
        ]);
    }

    public function completed(): static
    {
        return $this->state(fn (array $attributes): array => [
            'completed' => $attributes['total'],
        ]);
    }

    private function totalFor(string $unit): int
    {
        return match ($unit) {
            'Pages' => fake()->numberBetween(60, 400),
            'Hours' => fake()->numberBetween(6, 60),
            'Weeks' => fake()->numberBetween(8, 16),
            'Features' => fake()->numberBetween(6, 24),
            'Topics' => fake()->numberBetween(8, 20),
            'Modules' => fake()->numberBetween(4, 12),
            'Lessons' => fake()->numberBetween(8, 30),
            'Exercises' => fake()->numberBetween(10, 40),
            default => fake()->numberBetween(8, 26),
        };
    }
}
