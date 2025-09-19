<?php

namespace Database\Factories\Post;

use App\Models\Post\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post\PostMedia>
 */
class PostMediaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "post" => Post::factory(),
            'file_path' => 'https://picsum.photos/640/480.jpg',
        ];
    }
}
