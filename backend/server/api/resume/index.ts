const express = require('express');
const router = express.Router();
import ResumeController from './resume.controller';
const controller = new ResumeController();

import AuthService from '../../auth/auth.service';
const auth = new AuthService();

// import * as multer from 'multer';
// import * as GridFsStorage from 'multer-gridfs-storage';

import Config from '../../config';
const config: any = Config(process.env.NODE_ENV);

/**
 * @openapi
 * /api/resume:
 *   get:
 *     tags:
 *     - Resume
 *     summary: Get all Resume
 *     description:  detail about Resume 
 *     responses:
 *       200:
 *         description: success
 *       204:
 *         description: Unable to get lists
 */
router.get('/:code', controller.getDetail);

router.get('/resume-active-code/:code', controller.getActiveCode);

/**
 * @openapi
 * /api/resume:
 *   post:
 *     tags:
 *     - Resume
 *     summary: Add New  Resume (***Protected***)
 *     description: Create Resume 
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/resume'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/resumeResponse'
 *       204:
 *         description: Unable to create
 */
 router.post('/', auth.isAuthenticated(), controller.createNew); 

/**
 * @openapi
 * /api/resume/{id}:
 *   put:
 *     tags:
 *     - Resume
 *     summary: Get Item to update a single Resume & id is ObjectId (***Protected***)
 *     description:  detail about Resume
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId of the community
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/resume'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/resumeResponse'
 *       204:
 *         description: Unable to create
 */
router.put('/:id', auth.isAuthenticated(), controller.updateSingle);

/**
 * @openapi
 * /api/resume/{id}:
 *   get:
 *     tags:
 *     - Resume
 *     summary: Get Single Resume item (***Protected***)
 *     description: Detail about single Resume item 
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       204:
 *         description: Unable to get lists
 */
 router.get('/:id', auth.isAuthenticated(), controller.getSingleDetail);

/**
 * @openapi
 * /api/resume/{id}:
 *   delete:
 *     tags:
 *     - Resume
 *     summary: Delete a single Setting & id is ObjectId (***Protected***)
 *     description:  detail about Resume 
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId of the community
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: Unable to Delete.
 */
 router.delete('/:id', auth.isAuthenticated(), controller.deleteSingle);



// contact

/**
 * @openapi
 * /api/resume/contact/{resumeId}:
 *   post:
 *     tags:
 *     - Resume Contact
 *     summary: Add New  Resume Contact (***Protected***)
 *     description: Create Resume Contact
 *     parameters:
 *      - name: resumeId
 *        in: path
 *        description: ObjectId of the resume
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/contactResume'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/contactResponseResume'
 *       204:
 *         description: Unable to create
 */
router.post('/contact/:resumeId', auth.isAuthenticated(), controller.createNewContact);

/**
 * @openapi
 * /api/resume/contact/{id}:
 *   put:
 *     tags:
 *     - Resume Contact
 *     summary: Get Item to update a single contact Item (***Protected***)
 *     description:  detail about single contact Item
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId of the community
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/contactResume'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/contactResponseResume'
 *       204:
 *         description: Unable to create
 */
router.put('/contact/:id', auth.isAuthenticated(), controller.updateContactList);

/**
 * @openapi
 * /api/resume/contact/{id}:
 *   delete:
 *     tags:
 *     - Resume Contact
 *     summary: Delete single Contact (***Protected***)
 *     description: Delete single Contact
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId of the community
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: Unable to Delete.
 */
 router.delete('/contact/:id', auth.isAuthenticated(), controller.deleteSingleContact);



// social-media

/**
 * @openapi
 * /api/resume/social-media/{resumeId}:
 *   post:
 *     tags:
 *     - Resume Social Media
 *     summary: Add New  Resume Contact (***Protected***)
 *     description: Create Resume Contact
 *     parameters:
 *      - name: resumeId
 *        in: path
 *        description: ObjectId of the resume
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/socialMediaArray'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/socialMediaResponseResume'
 *       204:
 *         description: Unable to create
 */
 router.post('/social-media/:resumeId', auth.isAuthenticated(), controller.createNewSocialMedia);

/**
* @openapi
* /api/resume/social-media/{id}:
*   put:
*     tags:
*     - Resume Social Media
*     summary: Get Item to update a single Resume & id is ObjectId (***Protected***)
*     description:  detail about Resume
*     parameters:
*      - name: id
*        in: path
*        description: ObjectId of the community
*        required: true
*     requestBody:
*      required: true
*      content:
*        application/json:
*           schema:
*              $ref: '#/components/schema/socialMediaResume'
*     responses:
*       200:
*         description: success
*         content:
*          application/json:
*           schema:
*              $ref: '#/components/schema/socialMediaResponseResume'
*       204:
*         description: Unable to create
*/
 router.put('/social-media/:id', auth.isAuthenticated(), controller.updateSocialMediaList); 

/**
 * @openapi
 * /api/resume/social-media/{id}:
 *   delete:
 *     tags:
 *     - Resume Social Media
 *     summary: Delete single Social Media item (***Protected***)
 *     description: Delete single Social Media item 
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId of the community
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: Unable to Delete.
 */
router.delete('/social-media/:id', auth.isAuthenticated(), controller.deleteSingleSocialMedia);



// education

/**
 * @openapi
 * /api/resume/education/{resumeId}:
 *   post:
 *     tags:
 *     - Resume Education
 *     summary: Add New  Resume Contact (***Protected***)
 *     description: Create Resume Contact
 *     parameters:
 *      - name: resumeId
 *        in: path
 *        description: ObjectId of the resume
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/educationArray'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/educationResponseResume'
 *       204:
 *         description: Unable to create
 */
 router.post('/education/:resumeId', auth.isAuthenticated(), controller.createNewEducation);

/**
 * @openapi
 * /api/resume/education/{id}:
 *   delete:
 *     tags:
 *     - Resume Education
 *     summary: Delete single Social Media item (***Protected***)
 *     description: Delete single Social Media item 
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId of the community
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: Unable to Delete.
 */
 router.delete('/education/:id', auth.isAuthenticated(), controller.deleteSingleEducation);
 


// experience

/**
 * @openapi
 * /api/resume/experience/{resumeId}:
 *   post:
 *     tags:
 *     - Resume Experience
 *     summary: Add New  Resume Contact (***Protected***)
 *     description: Create Resume Contact
 *     parameters:
 *      - name: resumeId
 *        in: path
 *        description: ObjectId of the resume
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/experienceArray'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/experienceResponseResume'
 *       204:
 *         description: Unable to create
 */
 router.post('/experience/:resumeId', auth.isAuthenticated(), controller.createNewExperience);

/**
 * @openapi
 * /api/resume/experience/{id}:
 *   delete:
 *     tags:
 *     - Resume Experience
 *     summary: Delete single Social Media item (***Protected***)
 *     description: Delete single Social Media item 
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId of the community
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: Unable to Delete.
 */
 router.delete('/experience/:id', auth.isAuthenticated(), controller.deleteSingleExperience);
 


//  projects

/**
 * @openapi
 * /api/resume/projects/{resumeId}:
 *   post:
 *     tags:
 *     - Resume Projects
 *     summary: Add New  Resume Contact (***Protected***)
 *     description: Create Resume Contact
 *     parameters:
 *      - name: resumeId
 *        in: path
 *        description: ObjectId of the resume
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/projectsArray'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/projectResponseResume'
 *       204:
 *         description: Unable to create
 */
 router.post('/projects/:resumeId', auth.isAuthenticated(), controller.createNewProjects);

/**
 * @openapi
 * /api/resume/projects/{id}:
 *   delete:
 *     tags:
 *     - Resume Projects
 *     summary: Delete single Social Media item (***Protected***)
 *     description: Delete single Social Media item 
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId of the community
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: Unable to Delete.
 */
 router.delete('/projects/:id', auth.isAuthenticated(), controller.deleteSingleProjects);
 


//  Awards

/**
 * @openapi
 * /api/resume/awards/{resumeId}:
 *   post:
 *     tags:
 *     - Resume Awards
 *     summary: Add New  Resume Contact (***Protected***)
 *     description: Create Resume Contact
 *     parameters:
 *      - name: resumeId
 *        in: path
 *        description: ObjectId of the resume
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/awardsArray'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/awardsResponseResume'
 *       204:
 *         description: Unable to create
 */
 router.post('/awards/:resumeId', auth.isAuthenticated(), controller.createNewAwards);

/**
 * @openapi
 * /api/resume/awards/{id}:
 *   delete:
 *     tags:
 *     - Resume Awards
 *     summary: Delete single Social Media item (***Protected***)
 *     description: Delete single Social Media item 
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId of the community
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: Unable to Delete.
 */
 router.delete('/awards/:id', auth.isAuthenticated(), controller.deleteSingleAwards);
 

 //  Skills

/**
 * @openapi
 * /api/resume/skills/{resumeId}:
 *   put:
 *     tags:
 *     - Resume Skills
 *     summary: Add New  Resume Contact (***Protected***)
 *     description: Create Resume Contact
 *     parameters:
 *      - name: resumeId
 *        in: path
 *        description: ObjectId of the resume
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/skillsArray'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/skillsResponseResume'
 *       204:
 *         description: Unable to create
 */
 router.put('/skills/:resumeId', auth.isAuthenticated(), controller.getResumeForSkillsUpdate, controller.updateSkills);


module.exports = router; 
