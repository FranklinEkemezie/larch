<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Http\Resources\EntryResource;
use App\Http\Resources\GroupResource;
use App\Models\Entry;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use RuntimeException;
use Throwable;

class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //

        $groups = $request->user()->groups()
            ->with('entries')
            ->latest()
            ->get();

        return inertia('group/index', [
            'groups' => GroupResource::collection($groups),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //

        $entries = $request->user()->entries()->latest('updated_at')->get();

        return inertia('group/create', [
            'entries' => EntryResource::collection($entries),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateGroupRequest $request)
    {
        //

        try {
            /** @var Group $group */
            $group = DB::transaction(function () use ($request) {

                /** @var Group $group */
                $group = $request->user()->groups()->create($request->only('name'));

                $entryUuids = $request->array('entries');
                $entries = Entry::query()->whereIn('uuid', $entryUuids)->get();

                $group->entries()->attach($entries);

                return $group;
            });

            return redirect()->route('groups.show', $group);
        } catch (Throwable $e) {
            Log::error($e);

            return back()
                ->with(['error' => 'Failed to create group.'])
                ->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Group $group)
    {
        //

        $group->load('entries');

        return inertia('group/show', [
            'group' => $group->toResource()
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Group $group)
    {
        //

        $entries = $request->user()->entries()->latest('updated_at')->get();

        return inertia('group/edit', [
            'group'     => $group->toResource(),
            'entries'   => EntryResource::collection($entries),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGroupRequest $request, Group $group)
    {
        //

        try {
            DB::transaction(function () use ($request, $group) {

                if (! $group->update($request->only('name'))) {
                    throw new RuntimeException('Failed to update group.');
                }

                $entryUuids = $request->array('entries');
                $entries = Entry::query()->whereIn('uuid', $entryUuids)->get();

                $group->entries()->sync($entries);

            });
        } catch (Throwable $e) {

            Log::error($e);

            return back()
                ->withInput()
                ->withErrors(['name' => 'Failed to update group.']);
        }

        return redirect()->route('groups.show', $group);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Group $group)
    {
        //

        $group->delete();

        return redirect()->route('groups.index');
    }
}
