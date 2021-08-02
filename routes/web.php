<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/api{any}', function() {
    return;
})->where('any', '.*');

Route::get('/{any}', 'MainAppController@index')->where('any', '.*');
Route::get('excel-import', [ExcelController::class, 'excelimport']);
Route::post('stream-import', [ExcelController::class,'streamImport'])->name('stream-import');
Route::post('group-import', [ExcelController::class, 'groupImport'])->name('group-import');
Route::post('area-import', [ExcelController::class, 'areaImport'])->name('area-import');
Route::post('subarea-import', [ExcelController::class, 'subareaImport'])->name('subarea-import');
Route::post('criteria-import', [ExcelController::class, 'criteriaImport'])->name('criteria-import');