<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEntryRequest;
use App\Http\Requests\UpdateEntryRequest;
use App\Http\Resources\EntryResource;
use App\Http\Resources\GroupResource;
use App\Models\Entry;
use App\Models\Group;
use Illuminate\Http\Request;

class EntryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //

        $entries = $request->user()->entries()->latest()->get();

        return inertia('entry/index', [
            'entries' => EntryResource::collection($entries),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

        return inertia('entry/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreEntryRequest $request)
    {
        //

        $request->user()->entries()->create([
            'title'     => $request->input('title'),
            'unit'      => $request->input('unit'),
            'completed' => $request->float('completed'),
            'total'     => $request->float('total'),
        ]);

        return redirect()->route('entries.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Entry $entry)
    {
        //

        $entry->load('groups');

        return inertia('entry/show', [
            'entry'     => $entry->toResource(),
            'groups'    => GroupResource::collection($entry->groups)
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Entry $entry)
    {
        //

        return inertia('entry/edit', [
            'entry' => $entry->toResource()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEntryRequest $request, Entry $entry)
    {
        //

        if (! $entry->update($request->validated())) {
            return back()
                ->withInput()
                ->withErrors(['error' => 'Failed to update entry.']);
        }

        return redirect()->route('entries.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entry $entry)
    {
        //

        $entry->delete();

        return redirect()->route('entries.index');
    }
}
