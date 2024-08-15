import express from 'express';
import { createContent, displayAllContents, displayParticularContent, deleteContent, updateFeedback } from '../controllers/contentController.js';
import { upload } from '../utils/pics.js'; 

const router = express.Router();

router.route('/add').post(upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'iconImage', maxCount: 1 }]), createContent);
router.route('/display').get(displayAllContents);
router.route('/display/:id').get(displayParticularContent);
router.route('/display/:id/feedback').put(updateFeedback);
router.route('/delete/:id').delete(deleteContent);

export default router;
