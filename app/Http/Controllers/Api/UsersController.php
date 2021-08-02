<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Repositories\UserRepository;

class UsersController extends Controller
{
    protected $user;

    public function __construct(UserRepository $user)
    {
        $this->user = $user;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->respondWithSuccess(
            $this->user->findAllWithColumns(['id', 'name'])
        );
    }

    public function rank(Request $request)
    {
        $startDate = $request->query('start_date', NULL);
        $endDate = $request->query('end_date', NULL);

        return $this->respondWithSuccess(
            $this->user->rank($startDate, $endDate)
        );
    }
}
