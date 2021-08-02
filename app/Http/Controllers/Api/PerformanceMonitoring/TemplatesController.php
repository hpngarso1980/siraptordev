<?php

namespace App\Http\Controllers\Api\PerformanceMonitoring;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PerformanceTemplateRepository;
use App\Http\Resources\PerformanceTemplateCollection;

class TemplatesController extends Controller
{
    protected $performanceTemplate;
    protected $properties;

    public function __construct(PerformanceTemplateRepository $performanceTemplate)
    {
        $this->performanceTemplate = $performanceTemplate;
        $this->properties = [
            'name' => 'required',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->respondWithBareSuccess(
            new PerformanceTemplateCollection(
                $this->performanceTemplate->paginate(config('constants.PAGINATION_DEFAULT_LIMIT'))
            )
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
            $properties = $this->getTemplateInput();

            $template = $this->performanceTemplate->create($properties);

            return $this->respondWithCreated($template);
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
        return $this->findEntityById($this->performanceTemplate, $id);
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
        $template = $this->performanceTemplate->findById($id);

        if (!$template) return $this->respondWithNotFound();

        return $this->validateThenProceed(function () use ($id) {
            $properties = $this->getTemplateInput();

            $template = $this->performanceTemplate->update($id, $properties);

            return $this->respondWithSuccess($template);
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
        $template = $this->performanceTemplate->findById($id);
        $messagePrefix = 'Periode "'.$template->name.'"';

        if (!$template) return $this->respondWithNotFound();

        try {
            if ($template->delete($id)) return $this->respondWithDeleted($messagePrefix.' berhasil dihapus');
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus']);
        } catch (QueryException $e) {
            return $this->respondWithErrors([$messagePrefix.' gagal dihapus. Pastikan tidak ada yang menggunakan periode ini.']);
        }
    }

    private function getTemplateInput()
    {
        return request()->only(array_keys($this->properties));
    }
}
