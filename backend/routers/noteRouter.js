import express from 'express';
import { 
  addNote, 
  editNote, 
  getAllNotes, 
  getNoteById, 
  deleteNote, 
  updateNotePinned 
} from '../controllers/noteController.js';
import upload from '../utils/notefiles.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/display').get(authMiddleware, getAllNotes);

router.route('/add').post(
  authMiddleware, 
  upload.fields([{ name: 'file', maxCount: 1 }, { name: 'media', maxCount: 1 }, { name: 'song', maxCount: 1 }]), 
  addNote
);

router.route('/display/:id').get(authMiddleware, getNoteById);

router.route('/update/:id').put(
  authMiddleware, 
  upload.fields([{ name: 'file', maxCount: 1 }, { name: 'media', maxCount: 1 }, { name: 'song', maxCount: 1 }]), 
  editNote
);

router.route('/pin/:id').put(
  authMiddleware, 
  upload.fields([{ name: 'file', maxCount: 1 }, { name: 'media', maxCount: 1 }, { name: 'song', maxCount: 1 }]), 
  updateNotePinned
);

router.route('/delete/:id').delete(authMiddleware, deleteNote);

export default router;

