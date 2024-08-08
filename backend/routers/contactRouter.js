import express from 'express';
import { createContact, getAllContacts, updateContactStatus } from '../controllers/contactController.js';

const router = express.Router();

router.route('/issues')
    .post(createContact)
    .get(getAllContacts);

router.route('/issues/:id')
    .patch(updateContactStatus);

export default router;
