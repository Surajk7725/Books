import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: Only images and PDF files are allowed!');
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 50 }, // 50MB file size limit
    fileFilter: fileFilter
});

export { upload }; // Named export
export const uploadProfilePic = upload.single('profilePic');
