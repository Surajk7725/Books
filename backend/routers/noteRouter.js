import express from 'express';
import { addNote, editNote, getAllNotes, getNoteById, deleteNote } from '../controllers/noteController.js';
import { protect } from '../middleware/noteMiddleware.js';
import upload from '../utils/notefiles.js';

const router = express.Router();

router.route('/notes')
  .get(protect, getAllNotes)
  .post(protect, upload.fields([{ name: 'file' }, { name: 'media' }, { name: 'song' }]), addNote);

router.route('/notes/:id')
  .get(protect, getNoteById)
  .put(protect, upload.fields([{ name: 'file' }, { name: 'media' }, { name: 'song' }]), editNote)
  .delete(protect, deleteNote);

export default router;
