import ResumeModel from './resume.model';
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
import UploaderController from '../uploader/uploader.controller';
const uploaderController = new UploaderController();
export default class ResumeController {

    model = ResumeModel;

    getDetail = (req, res, next) => {
        const code: string = req.params.code || null;
        // console.log('---> ', code);
        this.model.find({ active: true, code: code }).sort({ createdAt: 1 }).exec((_err, data) => {
            if (!_err) {
                return res.json({ status: 200, message: 'success', data: data });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', data: data });
            }
        });
    }

    getActiveCode = (req, res, next) => {
        const code: string = req.params.code || null;
        const availableCode = ['2024-resume', 'benekiva-resume', '2025-resume', 'latest'];
        const codeResult = availableCode.includes(code);
        return res.json({ status: 200, result: codeResult });
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

    createNew = (req, res, _next: any) => {
        const _resume = {
            createdBy: req.user && req.user._id || null,
            name: req.body.name,
            role: req.body.role,
            careerSummary: req.body.careerSummary,
            intro: req.body.intro,
            longIntro: req.body.longIntro,
            description: req.body.description,
            image: req.body.image,
            siteUrl: req.body.siteUrl,
            copyrightText: req.body.copyrightText,
            experience: req.body.experience,
            skills: req.body.skills,
            education: req.body.education,
            awards: req.body.awards,
            interests: req.body.interests,
            language: req.body.language,
            projects: req.body.projects,
            contact: req.body.contact,
            socialMedia: req.body.socialMedia
        };

        this.model.create(_resume, (err, _data) => {
            if (!err) {
                return res.json({ status: 200, message: 'success', data: _resume });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', err: err, data: _resume });
            }
        });
    }

    createNewContact = (req, res, _next: any) => {

        console.log(req.body)
        console.log('------>>> ', req.params.resumeId)

        this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, {
            $set: {
                updatedBy: req.user && req.user._id || null,
                updatedAt: new Date()
            },
            $push: {
                contact: req.body
            }
        }).exec(async (err, _data) => {
            const updateData = await this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec();
            if (!err) {
                return res.json({ status: 200, message: 'success', data: updateData });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', err: err });
            }
        });
    }

    createNewSocialMedia = (req, res, _next: any) => {
        this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, {
            $set: {
                updatedBy: req.user && req.user._id || null,
                updatedAt: new Date()
            },
            $push: {
                socialMedia: req.body
            }
        }).exec(async (err, _data) => {
            const updateData = await this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec();
            if (!err) {
                return res.json({ status: 200, message: 'success', data: updateData });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', err: err });
            }
        });
    }

    updateSingle = async (req, res, _next) => {
        const _id = req.params.id;

        // console.log('*****---> ', req.body.experience)

        this.model.updateOne({ '_id': ObjectId(_id) }, {
            $set: {
                updatedBy: req.user && req.user._id || null,
                updatedAt: new Date(),
                active: req.body.active,
                name: req.body.name,
                role: req.body.role,
                careerSummary: req.body.careerSummary,
                intro: req.body.intro,
                longIntro: req.body.longIntro,
                description: req.body.description,
                image: req.body.image,
                siteUrl: req.body.siteUrl,
                copyrightText: req.body.copyrightText,
                experience: req.body.experience,
                skills: req.body.skills,
                education: req.body.education,
                awards: req.body.awards,
                interests: req.body.interests,
                language: req.body.language,
                projects: req.body.projects,
                contact: req.body.contact,
                socialMedia: req.body.socialMedia
            }
        }).exec(async (err, _data) => {
            const updateData = await this.model.findOne({ _id: ObjectId(_id) }).exec();
            if (!err) {
                return res.json({ status: 200, message: 'success', data: updateData });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', err: err });
            }
        });
    }

    deleteSingleSocialMedia = (req, res, _next) => {
        this.model.find({ 'socialMedia._id': { _id: ObjectId(req.params.id) } }).exec((_err, data) => {
            if (!_err && data && data[0]) {
                this.model.updateOne({ _id: data[0]._id }, {
                    '$pull': { 'socialMedia': { '_id': req.params.id } },
                }).exec((err, _resp) => {
                    if (!err) {
                        return res.json({ status: 200, message: 'success' });
                    }
                    else {
                        return res.json({ status: 404, message: 'Unable to Delete', err: err });
                    }
                });
            }
            else {
                return res.json({ status: 204, message: 'Unable to find Data' });
            }
        });
    }

    deleteSingleContact = (req, res, _next) => {
        this.model.find({ 'contact._id': { _id: ObjectId(req.params.id) } }).exec((_err, data) => {
            if (!_err && data && data[0]) {
                this.model.updateOne({ _id: data[0]._id }, {
                    '$pull': { 'contact': { '_id': req.params.id } },
                }).exec((err, _resp) => {
                    if (!err) {
                        return res.json({ status: 200, message: 'success' });
                    }
                    else {
                        return res.json({ status: 404, message: 'Unable to Delete', err: err });
                    }
                });
            }
            else {
                return res.json({ status: 204, message: 'Unable to find Data' });
            }
        });
    }

    deleteSingleEducation = (req, res, _next) => {
        this.model.find({ 'education._id': { _id: ObjectId(req.params.id) } }).exec((_err, data) => {
            if (!_err && data && data[0]) {
                this.model.updateOne({ _id: data[0]._id }, {
                    '$pull': { 'education': { '_id': req.params.id } },
                }).exec((err, _resp) => {
                    if (!err) {
                        return res.json({ status: 200, message: 'success' });
                    }
                    else {
                        return res.json({ status: 404, message: 'Unable to Delete', err: err });
                    }
                });
            }
            else {
                return res.json({ status: 204, message: 'Unable to find Data' });
            }
        });
    }

    deleteSingleExperience = (req, res, _next) => {
        this.model.find({ 'experience._id': { _id: ObjectId(req.params.id) } }).exec((_err, data) => {
            if (!_err && data && data[0]) {
                this.model.updateOne({ _id: data[0]._id }, {
                    '$pull': { 'experience': { '_id': req.params.id } },
                }).exec((err, _resp) => {
                    if (!err) {
                        return res.json({ status: 200, message: 'success' });
                    }
                    else {
                        return res.json({ status: 404, message: 'Unable to Delete', err: err });
                    }
                });
            }
            else {
                return res.json({ status: 204, message: 'Unable to find Data' });
            }
        });
    }

    deleteSingleProjects = (req, res, _next) => {
        this.model.find({ 'projects._id': { _id: ObjectId(req.params.id) } }).exec((_err, data) => {
            if (!_err && data && data[0]) {
                this.model.updateOne({ _id: data[0]._id }, {
                    '$pull': { 'projects': { '_id': req.params.id } },
                }).exec((err, _resp) => {
                    if (!err) {
                        return res.json({ status: 200, message: 'success' });
                    }
                    else {
                        return res.json({ status: 404, message: 'Unable to Delete', err: err });
                    }
                });
            }
            else {
                return res.json({ status: 204, message: 'Unable to find Data' });
            }
        });
    }

    deleteSingleAwards = (req, res, _next) => {
        this.model.find({ 'awards._id': { _id: ObjectId(req.params.id) } }).exec((_err, data) => {
            if (!_err && data && data[0]) {
                this.model.updateOne({ _id: data[0]._id }, {
                    '$pull': { 'awards': { '_id': req.params.id } },
                }).exec((err, _resp) => {
                    if (!err) {
                        return res.json({ status: 200, message: 'success' });
                    }
                    else {
                        return res.json({ status: 404, message: 'Unable to Delete', err: err });
                    }
                });
            }
            else {
                return res.json({ status: 204, message: 'Unable to find Data' });
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

    updateContactList = (req, res, next) => {
        this.model.updateOne({ active: true, 'contact._id': new ObjectId(req.params.id) }, {
            $set: {
                'contact.$.updatedBy': req.user && req.user._id || null,
                'contact.$.updatedOn': new Date(),
                'contact.$.name': req.body.name,
                'contact.$.logoURL': req.body.logoURL,
                'contact.$.landingLink': req.body.landingLink,
                'contact.$.icon': req.body.icon,
            }
        }).exec((err, nfl) => {
            if (!err) {
                return res.status(200).json({ success: true });
            }
        })
    }

    // createContactList = (req, res, next) => {
    //     this.model.updateOne({ active: true }, {
    //         $push: {
    //             'contact': {
    //                 createdBy: req.user && req.user._id || null,
    //                 name: req.body.name,
    //                 logoURL: req.body.logoURL,
    //                 landingLink: req.body.landingLink,
    //             }
    //         }
    //     }).exec((err, result) => {
    //         if (err) {
    //             console.log(err);
    //             return res.status(200).json({ success: false, message: 'Unable to update Contact' });
    //         }
    //         return res.status(200).json({ success: true, message: 'Notification list added' });
    //     });
    // }



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

    // createSocialMediaList = (req, res, next) => {
    //     this.model.updateOne({ active: true }, {
    //         $push: {
    //             'contact': {
    //                 createdBy: req.user && req.user._id || null,
    //                 name: req.body.name,
    //                 logoURL: req.body.logoURL,
    //                 landingLink: req.body.landingLink,
    //             }
    //         }
    //     }).exec((err, result) => {
    //         if (err) {
    //             console.log(err);
    //             return res.status(200).json({ success: false, message: 'Unable to update Contact' });
    //         }
    //         return res.status(200).json({ success: true, message: 'Notification list added' });
    //     });
    // }


    createNewEducation = (req, res, _next: any) => {
        this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, {
            $set: {
                updatedBy: req.user && req.user._id || null,
                updatedAt: new Date()
            },
            $push: {
                education: req.body
            }
        }).exec(async (err, _data) => {
            const updateData = await this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec();
            if (!err) {
                return res.json({ status: 200, message: 'success', data: updateData });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', err: err });
            }
        });
    }

    createNewExperience = (req, res, _next: any) => {
        this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, {
            $set: {
                updatedBy: req.user && req.user._id || null,
                updatedAt: new Date()
            },
            $push: {
                experience: req.body
            }
        }).exec(async (err, _data) => {
            const updateData = await this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec();
            if (!err) {
                return res.json({ status: 200, message: 'success', data: updateData });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', err: err });
            }
        });
    }

    createNewProjects = (req, res, _next: any) => {
        this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, {
            $set: {
                updatedBy: req.user && req.user._id || null,
                updatedAt: new Date()
            },
            $push: {
                projects: req.body
            }
        }).exec(async (err, _data) => {
            const updateData = await this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec();
            if (!err) {
                return res.json({ status: 200, message: 'success', data: updateData });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', err: err });
            }
        });
    }
    createNewAwards = (req, res, _next: any) => {
        this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, {
            $set: {
                updatedBy: req.user && req.user._id || null,
                updatedAt: new Date()
            },
            $push: {
                awards: req.body
            }
        }).exec(async (err, _data) => {
            const updateData = await this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec();
            if (!err) {
                return res.json({ status: 200, message: 'success', data: updateData });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', err: err });
            }
        });
    }

    getResumeForSkillsUpdate = (req, res, next) => {
        this.model.findById(ObjectId(req.params.resumeId)).exec((_err, data) => {
            if (!_err) {
                req.RESUME_DATA = data;
                return next();
            }
            else {
                return res.json({ status: 204, message: 'Invalid Id' });
            }
        });
    }

    updateSkills = async (req, res, _next: any) => {
        const resumeDoc = req.RESUME_DATA;
        if (resumeDoc) {
            resumeDoc.skills = req.body || {};
            this.model.updateOne({ '_id': ObjectId(req.params.resumeId) }, resumeDoc).exec(async (err, _data) => {
                const updateData = await this.model.findOne({ _id: ObjectId(req.params.resumeId) }).exec();
                if (!err) {
                    return res.json({ status: 200, message: 'success', data: updateData });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to create', err: err });
                }
            });
        } else {
            return res.json({ status: 204, message: `Data is not available with this id ${req.params.resumeId}` });
        }
    }

}
