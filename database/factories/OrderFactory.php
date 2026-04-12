<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->numberBetween(1,3),
            'total_amount' => fake()->randomFloat(2, 10, 500),
            'order_date' => fake()->date(),
            'should_call' => fake()->boolean(40),
            'delivery_address' => fake()->address(),
            'note' =>fake()->text(100), 
            'status' => fake()->randomElement(['pending']),
        ];
    }
}