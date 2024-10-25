const express = require('express');
const router = express.Router();
import SettingsController from './settings.controller';
const controller = new SettingsController();

import AuthService from '../../auth/auth.service';
const auth = new AuthService();

// import * as multer from 'multer';
// import * as GridFsStorage from 'multer-gridfs-storage';

import Config from '../../config';
const config: any = Config(process.env.NODE_ENV);

/**
 * @openapi
 * /api/settings:
 *   get:
 *     tags:
 *     - Settings
 *     summary: Get all Settings
 *     description:  detail about Settings 
 *     responses:
 *       200:
 *         description: success
 *       204:
 *         description: Unable to get lists
 */
 router.get('/', controller.getDetail); 

 /**
  * @openapi
  * /api/settings:
  *   post:
  *     tags:
  *     - Settings
  *     summary: Add New  Settings
  *     description: Create Settings 
  *     requestBody:
  *      required: true
  *      content:
  *        application/json:
  *           schema:
  *              $ref: '#/components/schema/settings'
  *     responses:
  *       200:
  *         description: success
  *         content:
  *          application/json:
  *           schema:
  *              $ref: '#/components/schema/settingsResponse'
  *       204:
  *         description: Unable to create
  */
 router.post('/', auth.isAuthenticated(), controller.createNew); 
 
 
 /**
  * @openapi
  * /api/settings/{id}:
  *   get:
  *     tags:
  *     - Settings
  *     summary: Get Single Settings item
  *     description: Detail about single Settings item 
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
  * /api/settings/contact/{id}:
  *   put:
  *     tags:
  *     - Settings
  *     summary: Get Item to update a single contact Item
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
  *              $ref: '#/components/schema/contact'
  *     responses:
  *       200:
  *         description: success
  *         content:
  *          application/json:
  *           schema:
  *              $ref: '#/components/schema/contactResponse'
  *       204:
  *         description: Unable to create
  */
 router.put('/contact/:id', auth.isAuthenticated(), controller.updateSingle); 

  /**
  * @openapi
  * /api/settings/social-media/{id}:
  *   put:
  *     tags:
  *     - Settings
  *     summary: Get Item to update a single Settings & id is ObjectId
  *     description:  detail about Settings
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
  *              $ref: '#/components/schema/socialMedia'
  *     responses:
  *       200:
  *         description: success
  *         content:
  *          application/json:
  *           schema:
  *              $ref: '#/components/schema/socialMediaResponse'
  *       204:
  *         description: Unable to create
  */
   router.put('/social-media/:id', auth.isAuthenticated(), controller.updateSingle); 

 /**
  * @openapi
  * /api/settings/{id}:
  *   put:
  *     tags:
  *     - Settings
  *     summary: Get Item to update a single Settings & id is ObjectId
  *     description:  detail about Settings
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
  *              $ref: '#/components/schema/settings'
  *     responses:
  *       200:
  *         description: success
  *         content:
  *          application/json:
  *           schema:
  *              $ref: '#/components/schema/settingsResponse'
  *       204:
  *         description: Unable to create
  */
 router.put('/:id', auth.isAuthenticated(), controller.updateSingle); 
 
 /**
  * @openapi
  * /api/settings/social-media/{id}:
  *   delete:
  *     tags:
  *     - Settings
  *     summary: Delete single Social Media item
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

 /**
  * @openapi
  * /api/settings/contact/{id}:
  *   delete:
  *     tags:
  *     - Settings
  *     summary: Delete single Contact
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

 /**
  * @openapi
  * /api/settings/{id}:
  *   delete:
  *     tags:
  *     - Settings
  *     summary: Delete a single Setting & id is ObjectId
  *     description:  detail about Settings 
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

module.exports = router; 
