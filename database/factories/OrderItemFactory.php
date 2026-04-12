<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OrderItem>
 */
class OrderItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'product_id' =>fake()->randomElement([4,5,6,7]),
            'quantity' =>fake()->numberBetween(4,40),
            'unit_price' => fake()->numberBetween(120,250),
            'subtotal' => fake()->numberBetween(500,30000),
            
        ];
    }
}