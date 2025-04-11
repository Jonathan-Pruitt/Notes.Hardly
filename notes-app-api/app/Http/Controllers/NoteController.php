<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Gate;

class NoteController extends Controller implements HasMiddleware
{
    public static function middleware() {
        return [
            new Middleware('auth:sanctum', except: ['index', 'show', 'showUserNotes'])
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return Note::all();
        return Note::with('user')->latest()->get();
    }

    /**
     * Display all notes from current user
     */
    // public function showUserNotes(Request $request) {
    //     return Note::all()->where('user_id', $request->user->id);
    // }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'min:3|nullable|max:65000'
        ]);

        $note = $request->user()->notes()->create($fields);

        // return [ 'note' => $note ];
        return ['note' => $note, 'user' => $note->user];
    }

    /**
     * Display the specified resource.
     */
    public function show(Note $note)
    {
        // return [ 'note' => $note];
        return ['note' => $note, 'user' => $note->user];
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Note $note)
    {
        Gate::authorize('modify', $note);

        $fields = $request->validate([
            'title' => 'required|max:255',
            'body' => 'min:3|nullable'
        ]);

        $note->update($fields);

        return [ 'note' => $note];
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        Gate::authorize('modify', $note);
        $note->delete();

        return [ 'message' => 'Note has been deleted'];
    }
}
