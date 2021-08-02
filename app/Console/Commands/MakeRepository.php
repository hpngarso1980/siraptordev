<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Str;

class MakeRepository extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:repository {name}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new repository class inside app/Repositories directory';

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
        $name = $this->argument('name');
        $modelName = str_replace('Repository', '', $name);
        $modelInsance = Str::camel($modelName);

        $template = file_get_contents(base_path('app/Console/Commands/MakeRepository/Repository.php.template'));
        $search = [
            'class Repository',
            'ModelName',
            'modelInstance',
        ];
        $replace = [
            "class $name",
            $modelName,
            $modelInsance,
        ];
        $content = str_replace($search, $replace, $template);
        $outputPath = app_path("Repositories/$name.php");

        if (file_exists($outputPath)) {
            $this->error("Repository $name already exists!");
        } else {
            file_put_contents($outputPath, $content);

            $this->info("Repository $name has been created in $outputPath");
        }
    }
}
