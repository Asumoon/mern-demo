import UserCtrl from './user.controller';
const controller = new UserCtrl();

const express = require('express');
const router = express.Router();

import AuthService from '../../auth/auth.service';
const auth = new AuthService();

// import * as multer from 'multer';
// import * as GridFsStorage from 'multer-gridfs-storage';

import Config from '../../config';
const config: any = Config(process.env.NODE_ENV);

// all Routes


/**
 * @openapi
 * /api/user/allusers:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - User
 *     summary: Get all Users Lists (***Protected***)
 *     description: Get all Users Lists
 *     responses:
 *       401:
 *         description: Access token is missing or invalid
 *       200:
 *         description: success
 *       204:
 *         description: Unable to get lists
 */
 router.get('/allusers', auth.isAuthenticated(), controller.users);


/**
 * @openapi
 * /api/user/add-new-user:
 *   post:
 *     tags:
 *     - User
 *     summary: Add New User
 *     description: Create New User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/user'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/userResponse'
 *       204:
 *         description: Unable to get lists
 */
 router.post('/add-new-user',
 controller.checkUserWithEmail,
 controller.newUser
);


/**
 * @openapi
 * /api/user/{id}:
 *   get:
 *     tags:
 *     - User
 *     summary: Get single User using id (***Protected***)
 *     description: Get single User using id
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
 router.get('/:id', auth.isAuthenticated(), controller.user);


/**
 * @openapi
 * /api/user/update-user/{id}:
 *   put:
 *     tags:
 *     - User
 *     summary: Update User using  id (***Protected***)
 *     description: Update User using Id
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
 *              $ref: '#/components/schema/user'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/userResponse'
 *       204:
 *         description: Unable to get lists
 */
router.put('/update-user/:id', auth.isAuthenticated(), auth.hasRoles(['SADMIN']), controller.updateUser);

/**
 * @openapi
 * /api/user/delete-user/{id}:
 *   delete:
 *     tags:
 *     - User
 *     summary: Delete a single User id is ObjectId (***Protected***)
 *     description: Delete User 
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId of User
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: Unable to Delete.
 */
 router.delete('/delete-user/:id', auth.isAuthenticated(), auth.hasRoles(['SADMIN']), controller.deleteSingle); 

// router.get('/search', auth.isAuthenticated(), auth.hasRoles(['ADMIN', 'USER']), controller.search)


module.exports = router;