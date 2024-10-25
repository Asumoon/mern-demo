import Config from '../../config';
import GalleryModel from './gallery.model';
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export default class GalleryController {

    model = GalleryModel;

    getDetail = (req, res, next) => {
        this.model.find({}).sort({ createdAt: 1 }).exec((_err, data) => {
            if (!_err) {
                return res.json({ status: 200, message: 'success', data: data });
            }
            else {
                return res.json({ status: 204, message: 'Unable to get lists', data: data });
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
        if (!req.file) {
           console.log('file is not Uploaded Please Upload file...');
        }

        console.log('file detail ', req.file);

        const _gallery = {
            createdBy: req.user && req.user._id || null,
            // communityName: req.body.communityName,
            // communityLogo: req.body.communityLogo,
            // communityMember: req.body.communityMember,
            // communityLink: req.body.communityLink
        };

        this.model.create(_gallery, (err, data) => {
            if (!err) {
                return res.json({ status: 200, message: 'success', data: _gallery });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', err: err, data: _gallery });
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
                // communityName: req.body.communityName,
                // communityLogo: req.body.communityLogo,
                // communityMember: req.body.communityMember,
                // communityLink: req.body.communityLink
            }
        }).exec((err, data) => {
            if (!err) {
                return res.json({ status: 200, message: 'success', data: updateData });
            }
            else {
                return res.json({ status: 204, message: 'Unable to Update', err: err, data: updateData });
            }
        });
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

}
