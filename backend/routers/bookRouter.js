import express from 'express';
import {addBookByStaff,addBookByUser,editBook,deleteBook,markBookAsAddedByStaff,
    displayAllBooks,displayParticularBook,displayBookmarkedBooks,displayUserAddedBooks,
    createBookRating,displayBookRatings,addBookComment, addCommentReply, displayBookComments,displayBooksByCategory
} from '../controllers/bookController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { upload } from '../utils/pics.js';

const router = express.Router();

router.post('/add', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'bookFile', maxCount: 1 }]), addBookByStaff);
router.route('/display').get(displayAllBooks);
router.route('/display/:title').get(displayParticularBook);
router.route('/edit/:title').put(editBook);
router.route('/delete/:id').delete(deleteBook);
router.get('/visible/:category', displayBooksByCategory);
router.route('/user/:username/bookmarks').get(displayBookmarkedBooks);

router.post('/user/add', authMiddleware, upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'bookFile', maxCount: 1 }]), addBookByUser);
router.route('/user/display').get(displayUserAddedBooks);
router.route('/user2staff-books').post(markBookAsAddedByStaff);
router.post('/rating', authMiddleware, createBookRating);
router.get('/display-ratings', displayBookRatings);

router.post('/comment', authMiddleware, addBookComment);
router.post('/comment/reply', authMiddleware, addCommentReply);
router.get('/:title/comments', displayBookComments);

export default router;
