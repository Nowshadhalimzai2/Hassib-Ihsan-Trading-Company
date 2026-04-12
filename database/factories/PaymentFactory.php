<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => fake()->randomElement([4,12,26]),
            'invoice_id' =>fake()->numberBetween(1,7),
            'payment_method_id' =>fake()->numberBetween(1,3),
            'amount' =>fake()->numberBetween(1000,5000) ,
            'notes' => fake()->text(100),
            'payment_date' => fake()->date(),
        ];
    }
}