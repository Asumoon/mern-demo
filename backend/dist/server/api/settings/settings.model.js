"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
/**
 * @openapi
 * components:
 *   contact:
 *     faq:
 *       type: object
 *       required:
 *        - name
 *        - logoURL
 *        - landingLink
 *       properties:
 *         name:
 *           type: string
 *           default: What is DeXit?
 *         logoURL:
 *           type: string
 *           default: What is DeXit?
 *         landingLink:
 *           type: number
 *           default: DeXit Chain is to bring programmability
 *     contactResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         updatedAt:
 *           type: string
 *         name:
 *           type: string
 *         logoURL:
 *           type: string
 *         landingLink:
 *           type: number
 */
var socialMediaSchema = new mongoose.Schema({
    createdBy: { type: ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: ObjectId, ref: 'User' },
    updatedOn: { type: Date, default: Date.now },
    name: { type: String },
    logoURL: { type: String },
    landingLink: { type: String },
});
/**
* @openapi
* components:
*   socialMedia:
*     faq:
*       type: object
*       required:
*        - email
*        - phone
*        - address
*        - country
*       properties:
*         email:
*           type: string
*           default: What is DeXit?
*         phone:
*           type: string
*           default: What is DeXit?
*         address:
*           type: number
*           default: DeXit Chain is to bring programmability
*         country:
*           type: Boolean
*           default: false
*     socialMediaResponse:
*       type: object
*       properties:
*         _id:
*           type: string
*         updatedAt:
*           type: string
*         email:
*           type: string
*         phone:
*           type: string
*         address:
*           type: number
*         country:
*           type: string
*/
var contactSchema = new mongoose.Schema({
    createdBy: { type: ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: ObjectId, ref: 'User' },
    updatedOn: { type: Date, default: Date.now },
    email: { type: String },
    phone: { type: Number },
    address: { type: String },
    country: { type: String },
});
/**
 * @openapi
 * components:
 *   settings:
 *     faq:
 *       type: object
 *       required:
 *        - category
 *        - faqQuestion
 *        - faqSolution
 *        - isFAQCategory
 *       properties:
 *         category:
 *           type: string
 *           default: What is DeXit?
 *         faqQuestion:
 *           type: string
 *           default: What is DeXit?
 *         faqSolution:
 *           type: number
 *           default: DeXit Chain is to bring programmability
 *         isFAQCategory:
 *           type: Boolean
 *           default: false
 *     settingsResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         updatedAt:
 *           type: string
 *         category:
 *           type: string
 *         faqQuestion:
 *           type: string
 *         faqSolution:
 *           type: number
 *         isFAQCategory:
 *           type: string
 */
var settingsSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: ObjectId, ref: 'User' },
    updatedBy: { type: ObjectId, ref: 'User' },
    name: { type: String },
    intro: { type: String },
    longIntro: { type: String },
    description: { type: String },
    logo: { type: String },
    siteUrl: { type: String },
    copyrightText: { type: String },
    contact: [contactSchema],
    socialMedia: [socialMediaSchema],
    active: { type: Boolean, default: true },
});
exports.default = mongoose.model('settings', settingsSchema);
//# sourceMappingURL=settings.model.js.map