<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Str;

class MakeEndpoint extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:endpoint {modelName} {controllerName}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create model, repository, factory and controller for a class';

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
        $modelName = $this->argument('modelName');
        $controllerName = str_replace('Controller', '', $this->argument('controllerName'));

        $this->call('make:model', [
            'name' => "Models/$modelName",
            '--factory' => true,
        ]);

        $this->call('make:repository', [
            'name' => "{$modelName}Repository",
        ]);

        $this->call('make:controller', [
            'name' => "Api/{$controllerName}Controller",
        ]);

        $this->call('make:test', [
            'name' => "Api/{$controllerName}Test",
        ]);
    }
}
