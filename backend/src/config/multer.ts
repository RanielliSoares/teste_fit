import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: path.resolve(__dirname, '..', 'uploads'),
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export default {
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5mb
    },
    fileFilter: (_req: any, file: Express.Multer.File, cb: any) => {
        const allowedMimes = ['image/jpeg', 'image/png'];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, and PNG are allowed.'));
        }
    },
}