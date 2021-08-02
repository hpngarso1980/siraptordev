<?php

namespace App\Http\Controllers\Api\SelfAssessment;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Excel;
use Illuminate\Support\Facades\Storage;

use App\Repositories\SelfAssessmentStreamRepository;
use App\Http\Resources\SelfAssessmentStreamCollection;
use App\Http\Resources\SelfAssessmentStreamMinimized;
use App\Services\SelfAssessment\StreamService;
use App\Imports\AreaGroupImport;
class StreamsController extends Controller
{
    protected $selfAssessmentStream;
    protected $properties;
    protected $excel;
    protected $streamService;

    public function __construct(SelfAssessmentStreamRepository $selfAssessmentStream, Excel $excel, StreamService $streamService)
    {
        $this->selfAssessmentStream = $selfAssessmentStream;
        $this->properties = [
            'name' => 'required',
            'score_target' => 'nullable|numeric',
        ];
        $this->excel = $excel;
        $this->streamService = $streamService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $all = request()->query('all') ? TRUE : FALSE;

        if ($all) {
            return $this->respondWithSuccess(
                SelfAssessmentStreamMinimized::collection($this->selfAssessmentStream->findAll())
            );
        }

        return $this->respondWithBareSuccess(
            new SelfAssessmentStreamCollection($this->selfAssessmentStream->paginate(config('constants.PAGINATION_DEFAULT_LIMIT')))
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
            $properties = $this->getStreamInput();

            $stream = $this->selfAssessmentStream->create($properties);

            return $this->respondWithCreated($stream);
        }, $this->properties);
    }

    public function import(Request $request)
    {
        ini_set('max_execution_time', 600);
        // $result = $this->excel->import(new AreaGroupImport, $request->file('file'));
        $file = $request->file('file');
        $streamName = preg_replace('/-clean/', '', preg_replace('/.xlsx/', '', $file->getClientOriginalName()));
        $result = $this->streamService->importAreasFromExcel($file);

        Storage::disk('master_data')->put("$streamName.json", json_encode($result, JSON_PRETTY_PRINT|JSON_PRETTY_PRINT));
        return $this->respondWithSuccess([
            'stream' => $streamName,
            'area_groups' => $result,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->findEntityById($this->selfAssessmentStream, $id);
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
        $stream = $this->selfAssessmentStream->findById($id);

        if (!$stream) return $this->respondWithNotFound();

        return $this->validateThenProceed(function () use ($id) {
            $properties = $this->getStreamInput();

            $stream = $this->selfAssessmentStream->update($id, $properties);

            return $this->respondWithSuccess($stream);
        }, $this->properties);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $stream = $this->selfAssessmentStream->findById($id);
        $messagePrefix = 'Stream "'.$stream->name.'"';

        if (!$stream) return $this->respondWithNotFound();

        try {
            if ($stream->delete($id)) return $this->respondWithDeleted($messagePrefix.' berhasil dihapus');
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus']);
        } catch (QueryException $e) {
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus. Pastikan tidak ada yang menggunakan stream ini.']);
        }
    }

    private function getStreamInput()
    {
        return request()->only(array_keys($this->properties));
    }
}
