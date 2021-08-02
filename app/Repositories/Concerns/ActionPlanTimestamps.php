<?php

namespace App\Repositories\Concerns;

use Arr;
use Carbon\Carbon;

trait ActionPlanTimestamps
{
    private function finalizeTimestamps($newProperties, $oldModel = NULL)
    {
        $oldStatus = $oldModel ? $oldModel->status : NULL;
        $newStatus = Arr::get($newProperties, 'status', NULL);

        if ($newStatus === 3 && $oldStatus !== 3) {
            $newProperties['finished_at'] = Carbon::now();
        } else if ($newStatus !== 3) {
            $newProperties['finished_at'] = NULL;
        }

        return $newProperties;
    }
}
