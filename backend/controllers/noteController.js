import asyncHandler from 'express-async-handler';
import Note from '../models/notes.js';

// Add Note
export const addNote = asyncHandler(async (req, res) => {
  const { title, content, isPinned } = req.body;
  const { file, media, song } = req.files;
  const note = new Note({
    title,
    content,
    file: file?.[0]?.path,
    media: media?.[0]?.path,
    song: song?.[0]?.path,
    isPinned: isPinned || false,
    user: req.user._id
  });
  const createdNote = await note.save();
  res.status(201).json(createdNote);
});

// Edit Note
export const editNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (note && note.user.toString() === req.user._id.toString()) {
    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    note.isPinned = req.body.isPinned !== undefined ? req.body.isPinned : note.isPinned;
    if (req.files.file) note.file = req.files.file[0].path;
    if (req.files.media) note.media = req.files.media[0].path;
    if (req.files.song) note.song = req.files.song[0].path;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404).json({ message: 'Note not found or unauthorized' });
  }
});


// Update Note Pinned Status
export const updateNotePinned = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isPinned } = req.body;
  const note = await Note.findById(id);
  if (note && note.user.toString() === req.user._id.toString()) {
    note.isPinned = isPinned;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404).json({ message: 'Note not found or unauthorized' });
  }
});

// Get All Notes
export const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ isPinned: -1 });
  res.json(notes);
});

// Get Note By ID
export const getNoteById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (note && note.user.toString() === req.user._id.toString()) {
    res.json(note);
  } else {
    res.status(404).json({ message: 'Note not found or unauthorized' });
  }
});

// Delete Note
export const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const note = await Note.findById(id);
  if (note && note.user.toString() === req.user._id.toString()) {
    await note.remove();
    res.json({ message: 'Note removed' });
  } else {
    res.status(404).json({ message: 'Note not found or unauthorized' });
  }
});


