<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use App\Models\SelfAssessmentStream;

class SelfAssessmentMasterDataTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $storage = Storage::disk('master_data');
        $files = $storage->files();

        foreach ($files as $fileName) {
            $content = $storage->get($fileName);
            $streamName = preg_replace('/.json/', '', $fileName);
            $this->insertData($streamName, json_decode($content));
        }
    }

    private function insertData($streamName, $areaGroups)
    {
        $stream = SelfAssessmentStream::create([
            'name' => $streamName,
        ]);

        foreach ($areaGroups as $areaGroup) {
            $persistedAreaGroup = $stream->areaGroups()->create([
                'name' => $areaGroup->name,
                'weight' => $areaGroup->weight,
            ]);

            foreach ($areaGroup->areas as $area) {
                $persistedArea = $persistedAreaGroup->areas()->create([
                    'name' => $area->name,
                ]);

                foreach ($area->sub_areas as $subArea) {
                    $persistedSubArea = $persistedArea->subAreas()->create([
                        'name' => $subArea->name,
                        'weight' => $subArea->weight,
                    ]);

                    foreach ($subArea->criteria as $criterion) {
                        $persistedCriterion = $persistedSubArea->criteria()->create([
                            'score' => $criterion->score,
                            'level' => $criterion->level,
                            'description' => $criterion->description,
                        ]);
                    }
                }
            }
        }
    }
}
