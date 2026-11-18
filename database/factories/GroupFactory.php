<?php

namespace Database\Factories;

use App\Models\Group;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Group>
 */
class GroupFactory extends Factory
{
    /**
     * @var array<int, string>
     */
    private const SUBJECTS = [
        'First Semester',
        'Second Semester',
        'Backend Engineering',
        'Frontend Craft',
        'Reading List',
        'Q4 Learning Plan',
        'Personal Finance',
        'Work Projects',
        'Interview Preparation',
        'Design Foundations',
    ];

    /**
     * @var array<int, string>
     */
    private const QUALIFIERS = [
        'Study Plan',
        'Learning Path',
        'Reading',
        'Revision',
        'Deep Dive',
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->randomElement(self::SUBJECTS).' — '.fake()->randomElement(self::QUALIFIERS),
        ];
    }
}
