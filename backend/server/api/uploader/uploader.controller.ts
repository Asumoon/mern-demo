import Config from '../../config';
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const multer = require('multer');
import path = require('path');

// remove file case
const fs = require('fs')
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)
// remove file case ends

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    var allowedMimes = ['image/svg+xml', 'image/jpeg', 'image/pjpeg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb({
            success: false,
            message: 'Invalid file type. Only svg, jpg, png image files are allowed.'
        }, false);
    }
};

const fileSizeLimit = 1 * 1024 * 1024; // 1 MB

const upload = multer({
    storage: storage,
    limits: { fileSize: fileSizeLimit },
    fileFilter: fileFilter
}).single('file');

export default class UploaderController {


    fileUpload = (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                let _message = 'Upload failed';
                if (err.code == 'LIMIT_FILE_SIZE') {
                    _message = 'File Size is too large. Allowed file size is 1MB';
                }
                return res.send({ success: false, message: _message, err: err })
            }
            else {
                if (!req.file) {
                    return res.json({ status: 500, message: 'file not found' });
                }
                return res.send({
                    success: true,
                    message: 'File uploaded successfully',
                    fileName: `${req.file.filename}`,
                    fileRoute: `${req.file.path}`,
                })
            }
        })
    }

    deleteFile =  async (req, res) => {
        const filePath = `public/uploads/${req.params.id}`;
        await unlinkAsync(filePath, (err) => {
            if(err) {
                return res.json({ status: 500, success: false, message: 'File not found', err: err });
            }
            return res.send({ success: true, message: 'Successfully deleated' })
        });
    }

    deleteFileWithURL =  async (fileURL) => {
        const filePath = fileURL;
        await unlinkAsync(filePath, (err) => {
            if(err) {
                console.log('File not found');
            }
            console.log('Successfully deleated');
            return;
        });
    }

}
