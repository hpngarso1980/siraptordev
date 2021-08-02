<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Tests\ApiUrls;
use Tests\ApiHelpers;

class InfoTest extends TestCase
{
    use RefreshDatabase, ApiUrls, ApiHelpers;

    public function testGetActionPlanStatusOptions()
    {
        $response = $this->apiRequest('GET', $this->apiUrls['actionPlanStatusOptions']);

        $response
            ->assertStatus(200)
            ->assertJson([
                'data' => [
                    [
                        "value" => 1,
                        "label" => "Baru"
                    ],
                    [
                        "value" => 2,
                        "label" => "Monitoring"
                    ],
                    [
                        "value" => 3,
                        "label" => "Selesai"
                    ],
                ],
            ]);
    }
}
