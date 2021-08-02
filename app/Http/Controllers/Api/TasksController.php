<?php

namespace App\Http\Controllers\Api;

use Arr;
use DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Repositories\TaskRepository;
use App\Repositories\UserRepository;
use App\Http\Resources\Task as TaskResource;
use App\Http\Resources\TaskSimplified as TaskSimplifiedResource;
use App\Notifications\TaskAssigned;

class TasksController extends Controller
{
    protected $task;
    protected $user;
    protected $properties;

    public function __construct(TaskRepository $task, UserRepository $user)
    {
        $this->task = $task;
        $this->user = $user;
        $this->properties = [
            'type' => 'required|integer',
            'title' => 'required|max:500',
            'description' => 'nullable',
            'state' => 'required|integer',
            'parent_id' => 'nullable|exists:tasks',
            'epic_id' => 'nullable|exists:epics',
            'due_date' => 'nullable|date_format:Y-m-d',
            'assignees' => 'exists:users,id',
            'custom_fields' => 'nullable',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $properties = [
            'epic_id' => $request->query('epic_id', NULL),
        ];
        $withAllSubTasks = $request->query('with_sub_tasks') === 'true';
        $epicId = $request->query('epic_id', NULL);
        $result = $epicId
            ? TaskSimplifiedResource::collection($this->task->findByEpicId($epicId))
            : [];

        return $this->respondWithSuccess(
            $result
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return $this->validateThenProceed(function () {
            $properties = $this->getTaskInput();

            $task = $this->task->create($properties);

            return $this->respondWithCreated(new TaskResource($task));
        }, $this->properties);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $task = $this->task->findById($id);

        if (!$task) return $this->respondWithNotFound();

        return $this->respondWithSuccess(new TaskResource($task));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $task = $this->task->findById($id);

        if (!$task) return $this->respondWithNotFound();

        return $this->validateThenProceed(function () use ($id) {
            $properties = $this->getTaskInput();

            $task = $this->task->update($id, $properties);
            $task = $this->syncAssignees($task);
            $task = $this->syncCustomFields($task);
            $this->syncTaskState($task);

            $task = $this->task->findById($id);

            return $this->respondWithSuccess(new TaskResource($task));
        }, $this->properties);
    }

    public function updateAttachment(Request $request, $id)
    {
        $task = $this->task->findById($id);

        if (!$task) return $this->respondWithNotFound();

        $userId = $request->user()->id;
        $properties = [
            'attachment' => 'file',
            'type' => 'nullable',
        ];
        $epic = $task->epic;
        $taskStoragePath = $this->getTaskStoragePath($task);
        $attachmentPath = $epic
            ? "$epic->title/$taskStoragePath"
            : $taskStoragePath;

        return $this->validateThenProceed(function () use ($userId, $attachmentPath, $task, $id) {
            $disk = config('constants.TASK_ATTACHMENT_DISK');

            if (request()->hasFile('attachment')) {
                $attachment = request()->file('attachment');
                $type = request()->input('type', NULL);

                if ($type === 'self_assessment') {
                    $attachmentPath = "self_assessment/$attachmentPath";
                }

                $fileName = $attachment->getClientOriginalName();
                $filePath = $attachment->storeAs($attachmentPath, $fileName, $disk);
                $task->attachments()->create([
                    'path' => $filePath,
                ]);
            }
            $this->syncTaskState($task);

            $task = $this->task->findById($id);

            return $this->respondWithSuccess(new TaskResource($task));
        }, $properties);
    }

    public function removeAttachment(Request $request, $id, $attachmentId)
    {
        $task = $this->task->findById($id);
        if (!$task) return $this->respondWithNotFound();

        $attachment = $task->attachments()->find($attachmentId);
        if (!$attachment) return $this->respondWithNotFound();

        $disk = config('constants.TASK_ATTACHMENT_DISK');
        Storage::disk($disk)->delete($attachment->path);

        $attachment->delete();
        $this->syncTaskState($task);

        $task = $this->task->findById($id);

        return $this->respondWithSuccess(new TaskResource($task));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task = $this->task->findById($id);

        if (!$task) return $this->respondWithNotFound();

        if ($task->delete($id)) return $this->respondWithDeleted('Task '.$task->name.' berhasil dihapus');

        return $this->respondWithErrors(['Task '.$task->name.' gagal dihapus']);
    }

    private function syncAssignees($task)
    {
        $assignees = request()->input('assignees', []);
        $notifyTargets = $this->user->findByIds($assignees);

        $task->assignees()->sync($assignees);

        $notifyTargets->each(function($target) use ($task) {
            $target->notify(new TaskAssigned($task, request()->user()));
        });

        return $task;
    }

    private function syncCustomFields($task)
    {
        $customFields = request()->input('custom_fields', []);

        foreach ($task->customFields as $field) {
            $value = Arr::get($customFields, $field->name, NULL);
            if ($value) {
                $task->customFields()->updateExistingPivot($field->id, [
                    'value' => $value,
                ]);
            }
        }

        return $task;
    }

    private function syncTaskState($task)
    {
        $attachmentCount = $task->attachments()->count();
        $todoState = config('enums.task_states.todo');
        $inProgressState = config('enums.task_states.in_progress');

        if ($attachmentCount > 0 && $task->state === $todoState) {
            $task->update([
                'state' => $inProgressState,
            ]);
        }

        if ($attachmentCount === 0 && $task->state === $inProgressState) {
            $task->update([
                'state' => $todoState,
            ]);
        }
    }

    private function getTaskInput()
    {
        return request()->only(array_keys(Arr::except($this->properties, [
            'assignees',
            'custom_fields',
            'attachments',
            'attachments.*',
            'attachment_path',
        ])));
    }

    private function getTaskStoragePath($task)
    {
        if (!$task->parent) return $task->title;

        $parentPath = $this->getTaskStoragePath($task->parent);
        return "$parentPath/$task->title";
    }
}
