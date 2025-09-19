<?php



test('example', function () {
    $response = $this->get('/contact');
    $response->assertStatus(200);
});
