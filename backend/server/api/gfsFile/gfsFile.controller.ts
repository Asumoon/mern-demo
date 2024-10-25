import GfsFile from './gfsFile.model';
import GfsChunk from './gfschunks.model';
// import BaseCtrl from './../base';
import * as mongoose from 'mongoose';
import * as Grid from 'gridfs-stream';
const mime = require('mime-types');
const { ObjectId } = require('mongodb');

const conn = mongoose.connection;
const gfs = new mongoose.mongo.GridFSBucket(conn.db);
let connection = mongoose.connection;

import {
    map, each, flatten, find, pick, merge,
    extend, keys, cloneDeep, uniqBy, filter, findIndex,
    intersectionWith, flatMapDeep, values, reject, difference, assign, concat, reverse, uniq
} from 'lodash';

export default class ActivityLogCtrl {
    model = GfsFile;

    justFileInfo = (req, res, next) => {
        if (!req.fileId) {
            return next();
        }

        GfsFile.findOne({
            _id: req.fileId
        }, (err, file) => {
            req.file = file;
            return next();
        });
    }


    fileInfo = (req, res, next) => {
        GfsFile.findOne({
            _id: req.params.fileId
        }, (err, file) => {
            let resJson;
            let extension;
           if(!err && file) {
            if (file) {
                resJson = JSON.parse(JSON.stringify(file));
                extension = mime.extension(resJson.contentType) || 'pdf';
                resJson['extension'] = '.' + extension;
            }
            res.json(resJson);
           } else {
             return res.json({ status: 204, message: 'Unable to find file', err: err });
           }
        });
    }

    getfileExtension = (req, res, next) => {
        GfsFile.findOne({
            _id: req.params.fileId
        }, (err, file) => {
            let resJson;
            if (file) {
                resJson = JSON.parse(JSON.stringify(file));
                req.extension = mime.extension(resJson.contentType) || 'pdf';
                next();
            }
        });
    }
    getStreamOfUploadedFile = (req, res, next) => {

        req.extension = req.extension || 'pdf';

        switch (req.extension) {
            case 'pdf': res.setHeader('Content-Type', 'application/pdf'); break;
            case 'png': res.setHeader('Content-Type', 'image/png'); break;
        }
        // res.setHeader('Content-Disposition', 'attachment; filename=foo.pdf');
        const readstream = gfs.openDownloadStream(ObjectId(req.params.fileId));

        readstream.pipe(res);
    }

    deleteOne = (fileId, callback) => {
        gfs.delete(ObjectId(fileId),((err, d) => {
            return callback('Deleted');
        }));
    }

    deleteFile = (req, res, next) => {
        const fileId = req.params.fileId || req.removeThisFileId;
        console.log('Required FIle That Need to Remove ======> ', fileId);
        this.deleteOne(fileId, resp => {
            return res.send(resp);
        });

    }

    deleteFileAndStartUpdate = (req, res, next) => {
        if (!req.file) { 
                return next();
        }
        else {
            console.log('we can delete file => ', req.body.oldFileId);
           const fileId = req.body.oldFileId

            if (fileId){
                this.deleteOne(fileId, resp => {
                    return next();
                });
            }
            else{
                return next();
            }
        }
    }

    allImage = (req, res, next) => {
        GfsFile.find({}).exec((err, file) => {
            if (file) { 
                let allImage = [];             
                each(file, i => {
                    if (i.contentType === 'image/jpeg' || 'image/gif') {
                        allImage.push(i._id);
                    }                    
                });
                req.allImage = allImage;
                return next();
            }
            else {
                return next();
            }
        });
    }

    checkObjectId = (req: any, res, next) => {
        if (this.checkIdAsParam(req.params.fileId) === false) {
          return res.status(500).json({ message: 'Invalid ID detected' });
        }    
        return next();
    }
    
    checkIdAsParam = (checkID) => {
      // console.log('C H E C K  I D -->  ', checkID, /^[a-f\d]{24}$/i.test(checkID));
       return /^[a-f\d]{24}$/i.test(checkID);
    }

}
