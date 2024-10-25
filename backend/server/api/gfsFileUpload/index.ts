const express = require('express');
const router = express.Router();

// import * as multer from 'multer';
// import * as GridFsStorage from 'multer-gridfs-storage';
import Config from '../../config';
const config: any = Config(process.env.NODE_ENV);

import ImageUpload from './gridImageOrFile.controller';
const imageController = new ImageUpload();

router.get('/image/:infoGather/:id',imageController.informationGathering, imageController.streamNewsImage);


module.exports = router;
