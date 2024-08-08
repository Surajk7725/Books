import express from 'express';
import { addNote, editNote, getAllNotes, getNoteById, deleteNote, updateNotePinned } from '../controllers/noteController.js';
import { protect } from '../middleware/noteMiddleware.js';
import upload from '../utils/notefiles.js';

const router = express.Router();

router.route('/display').get(protect, getAllNotes)
router.route('/add').post(protect, upload.fields([{ name: 'file' }, { name: 'media' }, { name: 'song' }]), addNote);

router.route('/display/:id').get(protect, getNoteById)
router.route('/update/:id').put(protect, upload.fields([{ name: 'file' }, { name: 'media' }, { name: 'song' }]), editNote)
router.route('/pin/:id').put(protect, upload.fields([{ name: 'file' }, { name: 'media' }, { name: 'song' }]), updateNotePinned)
router.route('/delete/:id').delete(protect, deleteNote);

export default router;
