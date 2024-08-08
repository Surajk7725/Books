import express from 'express';
import {addBookByStaff,addBookByUser,editBook,deleteBook,
    displayAllBooks,displayParticularBook,displayBookmarkedBooks,displayUserAddedBooks,
    createBookRating,displayBookRatings,addBookComment, addCommentReply, displayBookComments
} from '../controllers/bookController.js';
import { protect } from '../middleware/noteMiddleware.js';

const router = express.Router();

router.route('/add').post(addBookByStaff);
router.route('/display').get(displayAllBooks);
router.route('/display/:title').get(displayParticularBook);
router.route('/edit/:id').put(editBook);
router.route('/delete/:id').delete(deleteBook);

router.route('/user/:username/bookmarks').get(displayBookmarkedBooks);

router.route('/user/add').post(addBookByUser);
router.route('/user/display').get(displayUserAddedBooks);

router.post('/rating', protect, createBookRating);
router.get('/display-ratings', displayBookRatings);

router.post('/comment', protect, addBookComment);
router.post('/comment/reply', protect, addCommentReply);
router.get('/:title/comments', displayBookComments);

export default router;
