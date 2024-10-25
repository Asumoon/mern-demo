// import News from './model/news.model';
// import Addvertisement from './model/addvertisement.model';
import Config from '../../config';
import * as mongoose from 'mongoose';
import * as Grid from 'gridfs-stream';

import * as winston from 'winston';
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});
const logger = winston.createLogger({
    format: combine(
        label({ label: 'Log' }),
        myFormat,
        timestamp(),
        winston.format.splat(),
        winston.format.simple()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'users.log' })
    ]
});

// Remove
import gfsController from '../gfsFile/gfsFile.controller';


const gfsCtrl = new gfsController();


export default class ImageUpload {


    informationGathering = (req, res, next) => {
        const infoImage = req.params.infoGather;
        //  Update need in future
        //  need to change and create option so that it can be used same thing for multiple area
        // we can have record of how many times files transfered according to category option
        // console.log('Image Sub route Cat. => ', infoImage);
        return next();
    }


    // newsModel = News;
    // addvertisementModel = Addvertisement;


    // uploadNewsImage = (req, res, next) => {
    //     if (!req.file) {
    //         return res.json({ message: 'A single file source is required. Please refer to API Documentation for further details.' });
    //     }
    //     const newsImageUrl = req.file.id;
    //     this.newsModel.update({ _id: req.newsArticle._id }, {
    //         $set: {
    //             imageUrl: newsImageUrl
    //         }
    //     }, (err2, savedDoc) => {
    //         if (err2) {
    //             return res.status(422).json(err2);
    //         }
    //         console.log('UPDATED USER', err2, savedDoc);
    //         return res.status(200).json({ imageUrl: newsImageUrl, 'message': 'Success! Your profile picture has been saved.' });
    //     });
    // }

    cleanUp = (req, res, next) => {

        // GfsFile
        gfsCtrl.deleteOne(req.singleFileID, msg => {
            // res.send('Fax Received and Processed OK');
            // console.log('Message', msg);
        });

        if (req.body.delete) {
            next();
        } else {
            return res.json({ 'message': 'Fax Processed all good ' });
        }
    }

    streamNewsImage = (req, res, next) => {
        const conn = mongoose.connection;
        Grid.mongo = mongoose.mongo;
        const gfs = Grid(conn.db);
        // console.log('req.params.id', req.params.id);
        const readstream = gfs.createReadStream({
            _id: req.params.id
        });


        readstream.on('error', (err) => {
            console.log('STREAM AVATAR', err);
            //    throw new Error('An error occurred while streaming file.');
            logger.log('info', '***ERROR STREAMING AVATAR');
        });
        readstream.pipe(res);
        //   req.newsImageFile = readstream.pipe(res);
        //   return next();
    }


    // uploadAddvertisement = (req, res, next) => {

    //     console.log('uploadAddvertisement')
    //     console.log('==========================');
    //     console.log(req.file);
    //     console.log('==========================');

    //     if (!req.file) {
    //         req.flash('info', 'Please upload Addvertisement image');
    //         return res.redirect('/site-dashboard/addvertisement');
    //     }
    //     console.log("+++++++ addvertisement Upload Part +++++++++")
    //     console.log(req.body);
    //     console.log(req.file);

    //     const newsImageUrl = req.file.id;
    //     const addvertisementData = {
    //         addName: req.body.addName,
    //         addUrl: req.body.addUrl,
    //         addImage: newsImageUrl,
    //     };

    //     let addvertisementModel = new this.addvertisementModel(addvertisementData);
    //     addvertisementModel.save((err, newsResult) => {
    //         if (!err) {
    //             req.newsArticle = newsResult;
    //             req.flash('info', 'Addvertisement Successfully Uploaded');
    //             res.redirect('/site-dashboard/addvertisement');
    //         } else {
    //             console.log('errr => ', err);;
    //             req.flash('info', 'Unable to Register Addvertisement PLEASE Try Again .... !');
    //             res.redirect('/site-dashboard/new-add');
    //         }
    //     })
    // };

    // updateAddvertisementData = (req, res, next) => {

    //     console.log('updateAddvertisementData method Is Called')
    //     let updateId = req.params.id;
    //     console.log('==========================');
    //     console.log(updateId);
    //     console.log(req.file);
    //     console.log('==========================');

    //     if (!req.file) {
    //         this.addvertisementModel.update({ _id: updateId }, {
    //             $set: {
    //                 'addName': req.body.addName,
    //                 'addUrl': req.body.addUrl,
    //                 'active': req.body.active,
    //             },
    //         }, (err, data) => {
    //             if (!err) {
    //                 req.flash('info', 'Addvertisement is updated successfully');
    //                 // res.redirect(req.get('referer')); /site-dashboard/news-
    //                 res.redirect('/site-dashboard/addvertisement');
    //             } else {
    //                 res.send(err);
    //             }
    //         })
    //     }
    //     else {
    //         const newsImageUrl = req.file.id;
    //         this.addvertisementModel.update({ _id: updateId }, {
    //             $set: {
    //                 'addName': req.body.addName,
    //                 'addUrl': req.body.addUrl,
    //                 'active': req.body.active,
    //                 'addImage': newsImageUrl,
    //             },
    //         }, (err, data) => {
    //             if (!err) {
    //                 req.flash('info', 'Addvertisement is updated successfully');
    //                 res.redirect('/site-dashboard/addvertisement');
    //             } else {
    //                 res.send(err);
    //             }
    //         })
    //     }

    // }


}