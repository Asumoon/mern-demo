"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var user_model_1 = require("../api/user/user.model");
var auth_service_1 = require("./auth.service");
var authService = new auth_service_1.default();
require('./passportLocal/passport').setup(user_model_1.default);
var role_controller_1 = require("../api/role/role.controller");
var roleController = new role_controller_1.default();
var user_controller_1 = require("./../api/user/user.controller");
var userController = new user_controller_1.default();
var router = express.Router();
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
router.post('/login', authService.localLogin, 
// roleController.getRole,
authService.returnUserData);
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
//# sourceMappingURL=index.js.map