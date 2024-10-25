import morgan from 'morgan';
const express = require('express');
const router = express.Router();
import UploaderController from './uploader.controller';
const controller = new UploaderController();

import AuthService from '../../auth/auth.service';
const auth = new AuthService();
import Config from '../../config';


/**
 * @openapi
 * /api/uploader:
 *   post:
 *     tags:
 *     - Uploader
 *     summary: Add New Image 
 *     description: Add New Image
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *             type: object
 *             properties: 
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: success
 *       500:
 *         description: file not found
 */
router.post('/', auth.isAuthenticated(), controller.fileUpload);


/**
 * @openapi
 * /api/uploader/{id}:
 *   delete:
 *     tags:
 *     - Uploader
 *     summary: Delete a single image
 *     description: Delete a single image
 *     parameters:
 *      - name: id
 *        in: path
 *        description: File Name
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: Unable to Delete.
 */
router.delete('/:id', auth.isAuthenticated(), controller.deleteFile);

module.exports = router; 
