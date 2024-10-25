"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_controller_1 = require("./user.controller");
var controller = new user_controller_1.default();
var express = require('express');
var router = express.Router();
var auth_service_1 = require("../../auth/auth.service");
var auth = new auth_service_1.default();
// import * as multer from 'multer';
// import * as GridFsStorage from 'multer-gridfs-storage';
var config_1 = require("../../config");
var config = (0, config_1.default)(process.env.NODE_ENV);
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
router.post('/add-new-user', controller.checkUserWithEmail, controller.newUser);
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
//# sourceMappingURL=index.js.map