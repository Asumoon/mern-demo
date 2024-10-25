import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

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

const gallerySchema = new mongoose.Schema({
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now },
   createdBy: { type: ObjectId, ref: 'User' },
   updatedBy: { type: ObjectId, ref: 'User' },
   category: { type: String },
});


export default mongoose.model('gallery', gallerySchema);
