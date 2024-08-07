import express from 'express';
import {
    addBookByStaff,
    addBookByUser,
    editBook,
    displayAllBooks,
    displayParticularBook,
    deleteBook,
    displayBookmarkedBooks,
    displayUserAddedBooks
} from '../controllers/bookController.js';

const router = express.Router();

router.route('/add').post(addBookByStaff);
router.route('/display').get(displayAllBooks);
router.route('/display/:id').get(displayParticularBook);
router.route('/edit/:id').put(editBook);
router.route('/delete/:id').delete(deleteBook);

router.route('/user/:username/bookmarks').get(displayBookmarkedBooks);

router.route('/user/add').post(addBookByUser);
router.route('/user/display').get(displayUserAddedBooks);



export default router;
