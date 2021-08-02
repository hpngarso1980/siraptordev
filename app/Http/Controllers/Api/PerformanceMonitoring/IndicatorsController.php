<?php

namespace App\Http\Controllers\Api\PerformanceMonitoring;

use Arr;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Repositories\PerformanceIndicatorRepository;
use App\Repositories\PerformanceIndicatorGroupRepository;
use App\Repositories\PerformanceTemplateRepository;
use App\Http\Resources\PerformanceIndicatorCollection;
use App\Http\Resources\PerformanceIndicatorGroup as PerformanceIndicatorGroupResource;

class IndicatorsController extends Controller
{
    protected $performanceIndicator;
    protected $performanceIndicatorGroup;
    protected $performanceTemplate;
    protected $properties;
    protected $wrapperProperties;

    protected $rules;
    protected $supportedProperties;

    public function __construct(
        PerformanceIndicatorRepository $performanceIndicator,
        PerformanceIndicatorGroupRepository $performanceIndicatorGroup,
        PerformanceTemplateRepository $performanceTemplate
    )
    {
        $this->performanceIndicator = $performanceIndicator;
        $this->performanceIndicatorGroup = $performanceIndicatorGroup;
        $this->performanceTemplate = $performanceTemplate;
        $this->properties = [
            'performance_indicator_group_id' => 'required',
            'code' => 'required',
            'indicator' => 'required',
            'unit' => 'required',
            'weight' => 'required',
            'parent_id' => 'nullable',
        ];
        $this->wrapperProperties = [
            'indicators' => 'array',
            'deleted' => 'array',
        ];
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($templateId)
    {
        $indicators = $this->performanceIndicator->findAllByTemplateId($templateId);

        return $this->respondWithSuccess(
            new PerformanceIndicatorCollection($indicators)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $templateId)
    {
        return $this->validateThenProceed(function () use ($templateId) {
            $template = $this->performanceTemplate->findById($templateId);

            if (!$template) {
                return $this->respondWithNotFound('Template tidak ditemukan.');
            }

            $this->syncIndicators([
                'performance_template_id' => $templateId,
            ]);

            $indicators = $this->performanceIndicator->findAllByTemplateId($templateId);

            return $this->respondWithSuccess(new PerformanceIndicatorCollection($indicators));
        }, $this->wrapperProperties);
    }

    private function syncIndicators($properties = [])
    {
        $indicators = $this->getIndicatorsInput();
        $deletedIndicators = $this->getDeletedIndicatorsInput();

        foreach ($indicators as $indicator) {
            $this->saveIndicator($indicator, $properties);
        }

        if (count($deletedIndicators)) {
            $this->performanceIndicator->bulkDeleteByIds($deletedIndicators);
        }
    }

    private function saveIndicator($indicator, $properties)
    {
        $savedIndicator = $this->saveParentIndicator(array_merge(
            Arr::except($indicator, ['children', 'temp_id', 'indicator_group']),
            $properties
        ));

        $children = Arr::get($indicator, 'children', []);

        foreach ($children as $child) {
            $grandChildren = Arr::get($child, 'children', []);

            if (count($grandChildren) > 0) {
                $savedChild = $this->saveIndicator($child, $properties);
                $savedIndicator->children()->save($savedChild);
            } else {
                $this->saveChildIndicator($savedIndicator, array_merge(
                    Arr::except($child, ['children', 'temp_id', 'indicator_group']),
                    $properties
                ));
            }
        }

        return $savedIndicator;
    }

    private function saveParentIndicator($properties = [])
    {
        $isNew = blank(Arr::get($properties, 'id', NULL));

        if ($isNew) {
            $savedIndicator = $this->performanceIndicator->create(
                Arr::except($properties, ['children', 'temp_id', 'indicator_group'])
            );
        } else {
            $savedIndicator = $this->performanceIndicator->update(
                $properties['id'],
                Arr::except($properties, ['children', 'temp_id', 'indicator_group'])
            );
        }

        return $savedIndicator;
    }

    private function saveChildIndicator($indicator, $properties = [])
    {
        $isNew = blank(Arr::get($properties, 'id', NULL));

        if ($isNew) {
            $savedChildIndicator = $indicator->children()->create(
                Arr::except($properties, ['children', 'temp_id', 'indicator_group'])
            );
        } else {
            $savedChildIndicator = $this->performanceIndicator->update(
                $properties['id'],
                Arr::except($properties, ['children', 'temp_id', 'indicator_group'])
            );
        }

        return $savedChildIndicator;
    }

    private function validateIndicatorsInput()
    {

    }

    private function getDeletedIndicatorsInput()
    {
        return request()->input('deleted', []);
    }

    private function getIndicatorsInput()
    {
        return request()->input('indicators', []);
    }
}
