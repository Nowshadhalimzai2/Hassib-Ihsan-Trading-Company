<?php

namespace Tests\Feature;

use Inertia\Testing\Assert;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_example()
    {
        $response = $this->get('/about');
        $response->assertStatus(200);
        $response->assertDontSee('Hello World');
    }
    public function test_home_page()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
        $response->assertSee("Top");
    }
}
