<?php

namespace Tests\Feature\Api;

use App\Models\CustomField;
use App\Models\Epic;
use App\Models\Task;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use Tests\ApiHelpers;
use CustomFieldsTableSeeder;

class TasksTest extends TestCase
{
    use RefreshDatabase, ApiHelpers;

    protected $baseUrl = '/api/tasks';
    protected $taskStructure  = [
        'id',
        'type',
        'title',
        'description',
        'state',
        'due_date',
        'assignees' => [
            '*' => [
                'id',
                'name',
            ],
        ],
    ];
    protected $taskSimplifiedStructure  = [
        'id',
        'type',
        'title',
        'state',
        'due_date',
        'assignees' => [
            '*' => [
                'name',
            ],
        ],
    ];

    public function setUp(): void
    {
        parent::setUp();

        $this->seed(CustomFieldsTableSeeder::class);
    }

    public function testGetTasksWithEpicId()
    {
        $epic = factory(Epic::class)->create();
        $task = factory(Task::class)->create([
            'epic_id' => $epic->id,
        ]);

        $url = "$this->baseUrl?epic_id=$epic->id";
        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->taskSimplifiedStructure,
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'id' => $task->id,
                    ],
                ],
            ]);
    }

    public function testGetTasksWithoutEpicId()
    {
        $epic = factory(Epic::class)->create();
        $taskWithEpic = factory(Task::class)->create([
            'epic_id' => $epic->id,
        ]);
        $taskWithoutEpic = factory(Task::class)->create();

        $response = $this->apiRequest('GET', $this->baseUrl);

        $response
            ->assertStatus(200)
            ->assertExactJson([
                'data' => [],
            ]);
    }

    public function testGetTasksWithSubTasks()
    {
        $epic = factory(Epic::class)->create();
        $task = factory(Task::class)->create([
            'epic_id' => $epic->id,
            'type' => config('enums.task_types.stream'),
        ]);
        $level1SubTask = factory(Task::class)->create([
            'epic_id' => $epic->id,
            'parent_id' => $task->id,
            'type' => config('enums.task_types.area_group'),
        ]);
        $level2SubTask = factory(Task::class)->create([
            'epic_id' => $epic->id,
            'parent_id' => $level1SubTask->id,
            'type' => config('enums.task_types.area'),
        ]);

        $url = "$this->baseUrl?epic_id=$epic->id&with_sub_tasks=true";
        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => [
                    '*' => $this->taskSimplifiedStructure,
                ],
            ])
            ->assertJson([
                'data' => [
                    [
                        'id' => $task->id,
                        'sub_tasks' => [
                            [
                                'id' => $level1SubTask->id,
                                'sub_tasks' => [
                                    [
                                        'id' => $level2SubTask->id,
                                    ]
                                ]
                            ],
                        ],
                    ],
                ],
            ]);
    }

    public function testGetTaskById()
    {
        $epic = factory(Epic::class)->create();
        $task = factory(Task::class)->create([
            'epic_id' => $epic->id,
            'type' => config('enums.task_types.stream'),
        ]);

        $url = "$this->baseUrl/$task->id";
        $response = $this->apiRequest('GET', $url);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => $this->taskStructure,
            ])
            ->assertJson([
                'data' => [
                    'id' => $task->id,
                    'title' => $task->title,
                ],
            ]);
    }

    public function testCreateTask()
    {
        $task = [
            'type' => 1,
            'title' => 'Any string',
            'description' => 'Any string',
            'state' => 1,
            'due_date' => '2020-01-01',
        ];

        $response = $this->apiRequest('POST', $this->baseUrl, $task);

        $response
            ->assertStatus(201)
            ->assertJsonStructure([
                'data' => $this->taskStructure,
            ])
            ->assertJson([
                'data' => $task,
            ]);
    }

    public function testUpdateTask()
    {
        $user = factory(User::class)->create();
        $epic = factory(Epic::class)->create();
        $task = factory(Task::class)->create([
            'epic_id' => $epic->id,
        ]);
        $id = $task->id;
        $upatedTask = [
            'type' => 2,
            'title' => 'Any string updated',
            'description' => 'Any string updated',
            'state' => 3,
            'due_date' => '2020-01-02',
            'assignees' => [$user->id],
        ];
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('PATCH', $url, $upatedTask);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => $this->taskStructure,
            ])
            ->assertJson([
                'data' => [
                    'type' => $upatedTask['type'],
                    'title' => $upatedTask['title'],
                    'description' => $upatedTask['description'],
                    'state' => $upatedTask['state'],
                    'due_date' => $upatedTask['due_date'],
                    'assignees' => [
                        [
                            'id' => $user->id,
                            'name' => $user->name,
                        ]
                    ],
                ],
            ]);
    }

    public function testUpdateTaskCustomFields()
    {
        $task = factory(Task::class)->create();
        $customFieldIds = CustomField::whereIn('name', ['note', 'assessor_note', 'score'])
            ->get()
            ->map(function($field) {
                return $field->id;
            });
        $task->customFields()->sync($customFieldIds);

        $id = $task->id;
        $customFields = [
            'note' => 'Sample note',
            'assessor_note' => 'Sample assessor note',
            'score' => 100,
        ];
        $upatedTask = [
            'type' => 2,
            'title' => 'Any string updated',
            'description' => 'Any string updated',
            'state' => 3,
            'due_date' => '2020-01-02',
            'custom_fields' => $customFields,
        ];
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('PATCH', $url, $upatedTask);

        $this->assertDatabaseHas('task_custom_fields', [
            'task_id' => $id,
            'value' => $customFields['note'],
        ]);
        $this->assertDatabaseHas('task_custom_fields', [
            'task_id' => $id,
            'value' => $customFields['assessor_note'],
        ]);
        $this->assertDatabaseHas('task_custom_fields', [
            'task_id' => $id,
            'value' => $customFields['score'],
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => $this->taskStructure,
            ])
            ->assertJson([
                'data' => [
                    'type' => $upatedTask['type'],
                    'title' => $upatedTask['title'],
                    'description' => $upatedTask['description'],
                    'state' => $upatedTask['state'],
                    'due_date' => $upatedTask['due_date'],
                    'custom_fields' => [
                        'note' => [
                            'name' => 'note',
                            'value' => $customFields['note'],
                        ],
                        'assessor_note' => [
                            'name' => 'assessor_note',
                            'value' => $customFields['assessor_note'],
                        ],
                        'score' => [
                            'name' => 'score',
                            'value' => $customFields['score'],
                        ],
                    ],
                ],
            ]);
    }

    public function testUpdateTaskAttachments()
    {
        Storage::fake('task_attachments');

        $task = factory(Task::class)->create();
        $attachment1 = UploadedFile::fake()->createWithContent('attachment 1.pdf', 'Attachment 1');
        $attachment2 = UploadedFile::fake()->createWithContent('attachment 2.pdf', 'Attachment 2');

        $id = $task->id;
        $attachmentBasePath = config('constants.TASK_ATTACHMENT_URL');
        $attachment1Name = 'attachment 1.pdf';
        $attachment2Name = 'attachment 2.pdf';
        $attachment1Path = "$task->title/$attachment1Name";
        $attachment2Path = "$task->title/$attachment2Name";

        $url = "$this->baseUrl/$id/attachments";

        $response = $this->apiRequest('PUT', $url, [
            'attachment' => $attachment1,
        ]);
        $response = $this->apiRequest('PUT', $url, [
            'attachment' => $attachment2,
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => $this->taskStructure,
            ])
            ->assertJson([
                'data' => [
                    'attachments' => [
                        [
                            'path' => "$attachmentBasePath/$attachment1Path",
                            'name' => $attachment1Name,
                        ],
                        [
                            'path' => "$attachmentBasePath/$attachment2Path",
                            'name' => $attachment2Name,
                        ],
                    ]
                ],
            ]);

        Storage::disk('task_attachments')->assertExists($attachment1Path);
        Storage::disk('task_attachments')->assertExists($attachment2Path);

        $this->assertDatabaseHas('task_attachments', [
            'task_id' => $id,
            'path' => $attachment1Path,
        ]);
        $this->assertDatabaseHas('task_attachments', [
            'task_id' => $id,
            'path' => $attachment2Path,
        ]);
    }

    public function testUpdateTaskAttachmentsForSelfAssessment()
    {
        Storage::fake('task_attachments');

        $epic = factory(Epic::class)->create(['title' => 'Epic name']);
        $streamTask = factory(Task::class)->create(['title' => 'Stream name']);
        $areaTask = factory(Task::class)->create(['title' => 'Area name']);
        $subAreaTask = factory(Task::class)->create(['title' => 'Sub area name']);

        $areaTask->subTasks()->save($subAreaTask);
        $streamTask->subTasks()->save($areaTask);

        $streamTask->epic()->associate($epic)->save();
        $areaTask->epic()->associate($epic)->save();
        $subAreaTask->epic()->associate($epic)->save();

        $attachment1 = UploadedFile::fake()->createWithContent('attachment 1.pdf', 'Attachment 1');
        $attachment2 = UploadedFile::fake()->createWithContent('attachment 2.pdf', 'Attachment 2');

        $id = $subAreaTask->id;
        $attachmentBasePath = config('constants.TASK_ATTACHMENT_URL');
        $attachment1Name = 'attachment 1.pdf';
        $attachment2Name = 'attachment 2.pdf';
        $attachment1Path = "self_assessment/Epic name/Stream name/Area name/Sub area name/$attachment1Name";
        $attachment2Path = "self_assessment/Epic name/Stream name/Area name/Sub area name/$attachment2Name";

        $url = "$this->baseUrl/$id/attachments";

        $response = $this->apiRequest('PUT', $url, [
            'attachment' => $attachment1,
            'type' => 'self_assessment',
        ]);
        $response = $this->apiRequest('PUT', $url, [
            'attachment' => $attachment2,
            'type' => 'self_assessment',
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => $this->taskStructure,
            ])
            ->assertJson([
                'data' => [
                    'attachments' => [
                        [
                            'path' => "$attachmentBasePath/$attachment1Path",
                            'name' => $attachment1Name,
                        ],
                        [
                            'path' => "$attachmentBasePath/$attachment2Path",
                            'name' => $attachment2Name,
                        ],
                    ]
                ],
            ]);

        Storage::disk('task_attachments')->assertExists($attachment1Path);
        Storage::disk('task_attachments')->assertExists($attachment2Path);

        $this->assertDatabaseHas('task_attachments', [
            'task_id' => $id,
            'path' => $attachment1Path,
        ]);
        $this->assertDatabaseHas('task_attachments', [
            'task_id' => $id,
            'path' => $attachment2Path,
        ]);
    }

    public function testRemoveTaskAttachments()
    {
        Storage::fake('task_attachments');

        $task = factory(Task::class)->create();
        $attachment1 = UploadedFile::fake()->createWithContent('attachment 1.pdf', 'Attachment 1');
        $attachment2 = UploadedFile::fake()->createWithContent('attachment 2.pdf', 'Attachment 2');

        $id = $task->id;
        $attachmentBasePath = config('constants.TASK_ATTACHMENT_URL');
        $attachment1Name = 'attachment 1.pdf';
        $attachment2Name = 'attachment 2.pdf';
        $attachment1Path = "$task->title/$attachment1Name";
        $attachment2Path = "$task->title/$attachment2Name";

        $url = "$this->baseUrl/$id/attachments";

        $this->apiRequest('PUT', $url, [
            'attachment' => $attachment1,
        ]);
        $this->apiRequest('PUT', $url, [
            'attachment' => $attachment2,
        ]);

        Storage::disk('task_attachments')->assertExists($attachment1Path);
        Storage::disk('task_attachments')->assertExists($attachment2Path);

        $this->assertDatabaseHas('task_attachments', [
            'task_id' => $id,
            'path' => $attachment1Path,
        ]);
        $this->assertDatabaseHas('task_attachments', [
            'task_id' => $id,
            'path' => $attachment2Path,
        ]);

        $attachment1Data =  $task->attachments()->where('path', $attachment1Path)->first();
        $attachment2Data =  $task->attachments()->where('path', $attachment2Path)->first();

        $response = $this->apiRequest('DELETE', "$url/$attachment1Data->id");
        $response = $this->apiRequest('DELETE', "$url/$attachment2Data->id");

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'data' => $this->taskStructure,
            ])
            ->assertJson([
                'data' => [
                    'attachments' => []
                ],
            ]);

        Storage::disk('task_attachments')->assertMissing($attachment1Path);
        Storage::disk('task_attachments')->assertMissing($attachment2Path);

        $this->assertDatabaseMissing('task_attachments', [
            'task_id' => $id,
            'path' => $attachment1Path,
        ]);
        $this->assertDatabaseMissing('task_attachments', [
            'task_id' => $id,
            'path' => $attachment2Path,
        ]);
    }

    public function testDeleteTask()
    {
        $task = factory(Task::class)->create();
        $id = $task->id;
        $url = $this->baseUrl.'/'.$id;

        $response = $this->apiRequest('DELETE', $url);

        $response->assertStatus(200);

        $this->assertDeleted($task);
    }


    // public function testGetEpicSummaryForSelfAssessment()
    // {
    //     $customField = factory(CustomField::class)->create([
    //         'name' => 'score',
    //         'title' => 'Nilai',
    //         'type' => 'number'
    //     ]);
    //     $epic = factory(Epic::class)->create(['title' => 'Epic name']);
    //     $streamTask = factory(Task::class)->create(['title' => 'Stream name']);
    //     $areaTask = factory(Task::class)->create(['title' => 'Area name']);
    //     $subAreaTask = factory(Task::class)->create(['title' => 'Sub area name']);

    //     $areaTask->subTasks()->save($subAreaTask);
    //     $streamTask->subTasks()->save($areaTask);

    //     $streamTask->epic()->associate($epic)->save();
    //     $areaTask->epic()->associate($epic)->save();
    //     $subAreaTask->epic()->associate($epic)->save();

    //     $url = "$this->baseUrl/$epic->id/summary";
    //     $response = $this->apiRequest('GET', $url);

    //     $response
    //         ->assertStatus(200)
    //         ->assertJsonStructure([
    //             'data' => [
    //                 '*' => $this->epicStructure,
    //             ],
    //         ])
    //         ->assertJson([
    //             'data' => [
    //                 [
    //                     'title' => $epic->title,
    //                     'start_date' => $epic->start_date,
    //                     'end_date' => $epic->end_date,
    //                     'state' => $epic->state
    //                 ],
    //             ],
    //         ]);
    // }
}
