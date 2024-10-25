const express = require('express');
import User from '../api/user/user.model';
import AuthService from './auth.service';

const authService = new AuthService();
require('./passportLocal/passport').setup(User);

import RoleCtrl from '../api/role/role.controller';
const roleController = new RoleCtrl();


import UserCtrl from './../api/user/user.controller';
const userController = new UserCtrl();

const router = express.Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *     - Auth
 *     summary: Login with email and password
 *     description: Login with email and password
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/authLogin'
 *     responses:
 *       200:
 *         description: success
 *       204:
 *         description: Unable to get lists
 */
router.post('/login',
    authService.localLogin,
    // roleController.getRole,
    authService.returnUserData
);

// /**
//  * @openapi
//  * /api/auth/token:
//  *   post:
//  *     tags:
//  *     - Auth
//  *     description: Welcome to swagger-jsdoc!
//  *     responses:
//  *       200:
//  *         description: Returns a mysterious string.
//  */
// router.post('/token', authService.isAuthenticated(), authService.accessToken);
// // router.post('/token/refreshgranttoken', authService.refreshGrantToken); // Test Only
// // router.post('/token/verifygranttoken', authService.verifyGrantToken); // Test Only

// /**
//  * @openapi
//  * /api/auth/token/verify-refresh-token-and-get-new-token:
//  *   post:
//  *     tags:
//  *     - Auth
//  *     description: Welcome to swagger-jsdoc!
//  *     responses:
//  *       200:
//  *         description: Returns a mysterious string.
//  */
// router.post('/token/verify-refresh-token-and-get-new-token', authService.verifyGrantToken, authService.refreshGrantToken);

/**
 * @openapi
 * /api/auth/token/refresh-token:
 *   post:
 *     tags:
 *     - Auth
 *     summary: Send refreshToken  and get New refresh Token
 *     description:  Send refreshToken  and get New refresh Token
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/refreshToken'
 *     responses:
 *       200:
 *         description: success
 *       204:
 *         description: Unable to get lists
 */
router.post('/token/refresh-token', authService.verifyRefreshToken, authService.sendRefreshToken);


/**
 * @openapi
 * /api/auth/profile:
 *   get:
 *     security:
 *     - bearerAuth: []
 *     tags:
 *     - Auth
 *     summary: Get user detail from token (***Protected***)
 *     description: Get user detail from token
 *     responses:
 *       401:
 *         description: Access token is missing or invalid
 *       200:
 *         description: success
 *       204:
 *         description: Unable to get lists
 */
router.get('/profile', authService.isAuthenticated(), authService.verifyTokenAndGetDecoded, userController.getUserFromToken);
// router.get('/profile/:token', authService.isAuthenticated(), authService.verifyTokenAndGetDecoded, userController.getUserFromToken);

module.exports = router;