"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var movies_controller_1 = require("./movies.controller");
var controller = new movies_controller_1.default();
var auth_service_1 = require("../../auth/auth.service");
var auth = new auth_service_1.default();
var config_1 = require("../../config");
var config = (0, config_1.default)(process.env.NODE_ENV);
/**
 * @openapi
 * /api/movie:
 *   get:
 *     tags:
 *     - Movie
 *     summary: Get all Movie
 *     description:  detail about Movie
 *     responses:
 *       200:
 *         description: success
 *       204:
 *         description: Unable to get lists
 */
router.get('/', controller.getDetail);
/**
 * @openapi
 * /api/movie:
 *   post:
 *     tags:
 *     - Movie
 *     summary: Add New  Movie (***Protected***)
 *     description: Create Movie
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/movie'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/movieResponse'
 *       204:
 *         description: Unable to create
 */
router.post('/', controller.createNew);
/**
 * @openapi
 * /api/movie/{id}:
 *   put:
 *     tags:
 *     - Movie
 *     summary: Get Item to update a single Movie & id is ObjectId (***Protected***)
 *     description:  detail about Movie
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId of the movie
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schema/movie'
 *     responses:
 *       200:
 *         description: success
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schema/movieResponse'
 *       204:
 *         description: Unable to create
 */
router.put('/:id', controller.updateSingle);
/**
 * @openapi
 * /api/movie/{id}:
 *   get:
 *     tags:
 *     - Movie
 *     summary: Get Single Movie item (***Protected***)
 *     description: Detail about single Movie item
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
router.get('/:id', controller.getSingleDetail);
/**
 * @openapi
 * /api/movie/{id}:
 *   delete:
 *     tags:
 *     - Movie
 *     summary: Delete a single Setting & id is ObjectId (***Protected***)
 *     description:  detail about Movie
 *     parameters:
 *      - name: id
 *        in: path
 *        description: ObjectId of the movie
 *        required: true
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         description: Unable to Delete.
 */
router.delete('/:id', controller.deleteSingle);
module.exports = router;
//# sourceMappingURL=index.js.map