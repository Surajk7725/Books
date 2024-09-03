import express from 'express';
import {addBookByStaff,addBookByUser,editBook,deleteBook,markBookAsAddedByStaff, addBookmark, getBookAverageRating,
    displayAllBooks,displayParticularBook,displayBookmarkedBooks,displayUserAddedBooks, removeBookmark,
    createBookRating,addBookComment, addCommentReply, displayBookComments,displayBooksByCategory
} from '../controllers/bookController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { upload } from '../utils/pics.js';

const router = express.Router();

router.post('/add', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'bookFile', maxCount: 1 }]), addBookByStaff);
router.route('/display').get(displayAllBooks);
router.route('/display/:title').get(displayParticularBook);
router.put('/edit/:title', upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'bookFile', maxCount: 1 }]), editBook);
router.route('/delete/:id').delete(deleteBook);
router.get('/visible/:category', displayBooksByCategory);

router.get('/user/:username/bookmarks',authMiddleware, displayBookmarkedBooks);
router.post('/bookmark', authMiddleware, addBookmark);
router.post('/unbookmark', authMiddleware, removeBookmark);

router.post('/user/add', authMiddleware, upload.fields([{ name: 'coverImage', maxCount: 1 }, { name: 'bookFile', maxCount: 1 }]), addBookByUser);
router.route('/user/display').get(displayUserAddedBooks);
router.route('/user2staff-books').post(markBookAsAddedByStaff);

router.patch('/rating', authMiddleware, createBookRating);
router.get('/average-rating/:title', getBookAverageRating);

router.post('/comment', authMiddleware, addBookComment);
router.post('/comment/reply', authMiddleware, addCommentReply);
router.get('/:title/comments', displayBookComments);

export default router;
