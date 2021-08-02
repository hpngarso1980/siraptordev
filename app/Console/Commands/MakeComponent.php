<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class MakeComponent extends Command
{
    private $path,
            $customName,
            $useIndex,
            $pathSegments,
            $componentFileName,
            $componentName;
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:component {path} {name?} {--use-index}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a Vue component inside resources/js/components';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->prepareProperties();
        $this->makeComponentFile();
        $this->makeIndexFile();
    }

    private function prepareProperties()
    {
        $path = $this->argument('path');
        $customName = $this->argument('name');
        $useIndex = $this->option('use-index');

        $pathSegments = explode('/', $path);
        $componentFileName = str_replace('.vue', '', $pathSegments[array_key_last($pathSegments)]);
        $componentName = $customName ? $customName : $componentFileName;
        $this->path = $path;
        $this->customName = $customName;
        $this->useIndex = $useIndex;

        $this->pathSegments = $pathSegments;
        $this->componentFileName = $componentFileName;
        $this->componentName = $componentName;
    }

    private function makeComponentFile()
    {
        $path = $this->path;
        $componentName = $this->componentName;

        $componentTemplate = file_get_contents(base_path('app/Console/Commands/MakeComponent/Component.vue'));
        $componentContent = str_replace('{ComponentName}', $componentName, $componentTemplate);
        $componentOutputPath = resource_path("js/components/$path");

        if (file_exists($componentOutputPath)) {
            $this->error("Component $path already exists!");
        } else {
            file_put_contents($componentOutputPath, $componentContent);

            $this->info("Component $componentName has been created in $componentOutputPath");
        }
    }

    private function makeIndexFile()
    {
        $useIndex = $this->useIndex;
        $path = $this->path;
        $pathSegments = $this->pathSegments;
        $componentName = $this->componentName;
        $componentFileName = $this->componentFileName;

        $indexTemplate = file_get_contents(base_path('app/Console/Commands/MakeComponent/index.js'));
        $indexContent = str_replace('{ComponentFileName}', $componentFileName, $indexTemplate);
        $indexOutputPath = str_replace($pathSegments[array_key_last($pathSegments)], 'index.js', resource_path("js/components/$path"));

        if (!$useIndex) {
            return;
        }

        if (file_exists($indexOutputPath)) {
            $this->error("Index for component $path already exists!");
        } else {
            file_put_contents($indexOutputPath, $indexContent);

            $this->info("Index for component $componentName has been created in $indexOutputPath");
        }
    }
}
