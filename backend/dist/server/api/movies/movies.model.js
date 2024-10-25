"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
// M A I N
/**
 * @openapi
 * components:
 *   schema:
 *     movie:
 *       type: object
 *       required:
 *        - title
 *        - year
 *        - genre
 *        - image
 *       properties:
 *         title:
 *           type: string
 *           default: movie title
 *         year:
 *           type: number
 *           default: 2024
 *         genre:
 *           type: string
 *           default: genre details
 *         active:
 *           type: boolean
 *           default: true
 *     movieResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         year:
 *           type: number
 *         genre:
 *           type: string
 *         image:
 *           type: string
 */
var movieSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: ObjectId, ref: 'User' },
    updatedBy: { type: ObjectId, ref: 'User' },
    title: { type: String },
    year: { type: Number },
    genre: { type: String },
    image: { type: String },
});
exports.default = mongoose.model('movie', movieSchema);
//# sourceMappingURL=movies.model.js.map