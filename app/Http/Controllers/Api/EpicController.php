<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\EpicRepository;
use App\Http\Resources\Epic as EpicResource;
use App\Http\Resources\EpicCollection;

class EpicController extends Controller
{
    protected $epic;
    protected $task;
    protected $epicProperties;

    public function __construct(EpicRepository $epic)
    {
        $this->epic = $epic;
        $this->epicProperties = [
            'title' => 'required',
            'start_date' => 'nullable|date_format:Y-m-d',
            'end_date' => 'nullable|date_format:Y-m-d',
        ];
    }

    public function index()
    {
        return $this->respondWithBareSuccess(
            new EpicCollection(
                $this->epic->paginate(config('constants.PAGINATION_DEFAULT_LIMIT'))
            )
        );
    }

    public function update(Request $request, $id)
    {
        $epic = $this->epic->findById($id);

        if (!$epic) return $this->respondWithNotFound();

        return $this->validateThenProceed(function () use ($id) {
            $properties = request()->only(array_keys($this->epicProperties));

            $epic = $this->epic->update($id, $properties);

            return $this->respondWithSuccess(new EpicResource($epic));
        }, $this->epicProperties);
    }

    // public function destroy($id)
    // {
    //     $epic = $this->epic->findById($id);
    //     $messagePrefix = 'Project "'.$epic->name.'"';

    //     if (!$epic) return $this->respondWithNotFound();

    //     try {
    //         if ($epic->delete($id)) return $this->respondWithDeleted($messagePrefix.' berhasil dihapus');
    //         return $this->respondWithErrors([$messagePrefix.' gagal dihapus']);
    //     } catch (QueryException $e) {
    //         return $this->respondWithErrors([$messagePrefix.' gagal dihapus. Pastikan tidak ada yang menggunakan stream ini.']);
    //     }
    // }
}
