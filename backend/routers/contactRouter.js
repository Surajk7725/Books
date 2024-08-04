import express from 'express';
import {createContact, getAllContacts} from '../controllers/contactController.js';

const router = express.Router();

router.post('/create-issue',createContact);
router.get('/display-issues',getAllContacts);

export default routers;