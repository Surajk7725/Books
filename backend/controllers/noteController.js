import asyncHandler from 'express-async-handler';
import Note from '../models/notes.js';

// Add Note
export const addNote = asyncHandler(async (req, res) => {
  const { title, content, isPinned } = req.body;

  const filePath = req.files?.file?.[0] ? `${req.files.file[0].filename}` : null;
  const mediaPath = req.files?.media?.[0] ? `${req.files.media[0].filename}` : null;
  const songPath = req.files?.song?.[0] ? `${req.files.song[0].filename}` : null;

  const note = new Note({
    title,
    content,
    file: filePath,
    media: mediaPath,
    song: songPath,
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

        if (req.files?.file) note.file = `${req.files.file[0].filename}`;
        if (req.files?.media) note.media = `${req.files.media[0].filename}`;
        if (req.files?.song) note.song = `${req.files.song[0].filename}`;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.status(404).json({ message: 'Note not found or unauthorized' });
    }
});

// Update Note Pinned Status
export const updateNotePinned = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let { isPinned } = req.body;

  // Convert to boolean
  isPinned = (isPinned === 'true');

  if (typeof isPinned !== 'boolean') {
    return res.status(400).json({ message: 'Invalid isPinned value' });
  }

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

  if (!note) {
    return res.status(404).json({ message: 'Note not found' });
  }

  if (note.user && note.user.toString() === req.user._id.toString()) {
    await note.deleteOne(); 
    res.json({ message: 'Note removed' });
  } else {
    res.status(401).json({ message: 'Unauthorized: You do not have permission to delete this note' });
  }
});

