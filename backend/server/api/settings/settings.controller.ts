import Config from '../../config';
import SettingsModel from './settings.model';
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
import UploaderController from '../uploader/uploader.controller';
const uploaderController = new UploaderController();
export default class SettingsController {

    model = SettingsModel;

    getDetail = (req, res, next) => {
        this.model.find({}).sort({ createdAt: 1 }).exec((_err, data) => {
            if (!_err) {
                return res.json({ status: 200, message: 'success', data: data });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', data: data });
            }
        });
    }

    getSingleDetail = (req, res, next) => {
        this.model.findById(req.params.id).sort({ createdAt: 1 }).exec((_err, data) => {
            if (!_err) {
                return res.json({ status: 200, message: 'success', data: data });
            }
            else {
                return res.json({ status: 204, message: 'Unable to get lists', data: data });
            }
        });
    }

    createNew = (req, res, next) => {

        const _faq = {
            createdBy: req.user && req.user._id || null,
            category: req.body.category,
            faqQuestion: req.body.faqQuestion,
            faqSolution: req.body.faqSolution,
            isFAQCategory: req.body.isFAQCategory,
        };

        this.model.create(_faq, (err, data) => {
            if (!err) {
                return res.json({ status: 200, message: 'success', data: _faq });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', err: err, data: _faq });
            }
        });
    }

    updateSingle = async (req, res, next) => {
        const _id = req.params.id;
        const updateData = await this.model.findOne({ _id: ObjectId(_id) }).exec();

        this.model.updateOne({ '_id': updateData._id }, {
            $set: {
                updatedBy: req.user && req.user._id || null,
                updatedAt: new Date(),
                category: req.body.category,
                faqQuestion: req.body.faqQuestion,
                faqSolution: req.body.faqSolution,
                isFAQCategory: req.body.isFAQCategory,
            }
        }).exec((err, data) => {
            if (!err) {
                return res.json({ status: 200, message: 'success', data: updateData });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', err: err, data: updateData });
            }
        });
    }

    deleteSingleSocialMedia = (req, res, next) => {
        //    const _id = req.params.id;
        //    this.model.deleteOne({ _id: ObjectId(_id) }).exec((err, resp) => {
        //        if (!err) {
        //            return res.json({ status: 200, message: 'success', id: _id });
        //        }
        //        else {
        //            return res.json({ status: 404, message: 'Unable to Delete', err: err, id: _id });
        //        }
        //    });
    }

    deleteSingleContact = (req, res, next) => {
        //    const _id = req.params.id;
        //    this.model.deleteOne({ _id: ObjectId(_id) }).exec((err, resp) => {
        //        if (!err) {
        //            return res.json({ status: 200, message: 'success', id: _id });
        //        }
        //        else {
        //            return res.json({ status: 404, message: 'Unable to Delete', err: err, id: _id });
        //        }
        //    });
    }

    deleteSingle = (req, res, next) => {
        const _id = req.params.id;
        this.model.deleteOne({ _id: ObjectId(_id) }).exec((err, resp) => {
            if (!err) {
                return res.json({ status: 200, message: 'success', id: _id });
            }
            else {
                return res.json({ status: 404, message: 'Unable to Delete', err: err, id: _id });
            }
        });
    }

    updateContactList = (req, res, next) => {
        this.model.updateOne({ active: true, 'contact._id': new ObjectId(req.params.id) }, {
            $set: {
                'contact.$.updatedBy': req.user && req.user._id || null,
                'contact.$.updatedOn': new Date(),
                'contact.$.name': req.body.name,
                'contact.$.logoURL': req.body.logoURL,
                'contact.$.landingLink': req.body.landingLink,
            }
        }).exec((err, nfl) => {
            if (!err) {
                return res.status(200).json({ success: true });
            }
        })
    }

    createContactList = (req, res, next) => {
        this.model.updateOne({ active: true }, {
            $push: {
                'contact': {
                    createdBy: req.user && req.user._id || null,
                    name:req.body.name,
                    logoURL:req.body.logoURL,
                    landingLink:req.body.landingLink,
                }
            }
        }).exec((err, result) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ success: false, message: 'Unable to update Contact' });
            }
            return res.status(200).json({ success: true, message: 'Notification list added' });
        });
    }



    updateSocialMediaList = (req, res, next) => {
        this.model.updateOne({ active: true, 'contact._id': new ObjectId(req.params.id) }, {
            $set: {
                'contact.$.updatedBy': req.user && req.user._id || null,
                'contact.$.updatedOn': new Date(),
                'contact.$.name': req.body.name,
                'contact.$.logoURL': req.body.logoURL,
                'contact.$.landingLink': req.body.landingLink,
            }
        }).exec((err, nfl) => {
            if (!err) {
                return res.status(200).json({ success: true });
            }
        })
    }

    createSocialMediaList = (req, res, next) => {
        this.model.updateOne({ active: true }, {
            $push: {
                'contact': {
                    createdBy: req.user && req.user._id || null,
                    name:req.body.name,
                    logoURL:req.body.logoURL,
                    landingLink:req.body.landingLink,
                }
            }
        }).exec((err, result) => {
            if (err) {
                console.log(err);
                return res.status(200).json({ success: false, message: 'Unable to update Contact' });
            }
            return res.status(200).json({ success: true, message: 'Notification list added' });
        });
    }

}
