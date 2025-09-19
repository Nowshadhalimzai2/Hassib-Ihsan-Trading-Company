<?php

namespace Database\Factories\Post;

use App\Models\Post\PostMedia;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            // 'post_media_id' => PostMedia::factory()->count(2),
            'file_path' => 'https://picsum.photos/seed/',
            'content' => $this->faker->paragraph(),
        ];
    }
}
