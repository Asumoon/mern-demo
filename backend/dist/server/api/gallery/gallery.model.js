"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
/**
 * @openapi
 * components:
 *   schema:
 *     gallery:
 *       type: object
 *       required:
 *        - category
 *       properties:
 *         category:
 *           type: string
 *           default: facebook
 *     galleryResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         updatedAt:
 *           type: string
 *         category:
 *           type: string
 */
var gallerySchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: ObjectId, ref: 'User' },
    updatedBy: { type: ObjectId, ref: 'User' },
    category: { type: String },
});
exports.default = mongoose.model('gallery', gallerySchema);
//# sourceMappingURL=gallery.model.js.map