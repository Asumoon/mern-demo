"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
// experienceArray
/**
 * @openapi
 * components:
 *   schema:
 *     experienceArray:
 *       type: object
 *       required:
 *        - role
 *        - company
 *        - startDate
 *        - endDate
 *        - location
 *        - roleDescription
 *        - achievements
 *        - languageUsed
 *        - otherList
 *       properties:
 *         role:
 *           type: string
 *           default: Full Stack Developer
 *         company:
 *           type: string
 *           default: Benekiva
 *         startDate:
 *           type: number
 *           default: 2019
 *         endDate:
 *           type: string
 *           default: 2022
 *         location:
 *           type: string
 *           default: Kathmandu
 *         roleDescription:
 *           type: string
 *           default: Role description goes here ipsum dolor sit amet.
 *         achievements:
 *           type: string
 *           default: TODO
 *         languageUsed:
 *           type: array
 *           example: ['NodeJs', 'TS', 'Angular']
 *         otherList:
 *           type: string
 *           default: TODO
 *     experienceResponseResume:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         updatedAt:
 *           type: string
 *         role:
 *           type: string
 *         company:
 *           type: string
 *         startDate:
 *           type: number
 *         endDate:
 *           type: string
 *         location:
 *           type: string
 *         roleDescription:
 *           type: string
 *         achievements:
 *           type: string
 *         languageUsed:
 *           type: array
 *         otherList:
 *           type: string
 */
var experienceSchema = new mongoose.Schema({
    role: { type: String },
    company: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    location: { type: String },
    roleDescription: { type: String },
    achievements: { type: String },
    languageUsed: [String],
    otherList: { type: String }, // Array List
});
// example tech_stack: ['NodeJS', 'JavaScript(ES6+)', 'Angular 2+', 'TypeScript', 'SCSS']
// tech_stack
/**
 * @openapi
 * components:
 *   schema:
 *     skillsTechStack:
 *       type: object
 *       required:
 *        - name
 *        - logo
 *       properties:
 *         name:
 *           type: string
 *           default: NodeJS
 *         logo:
 *           type: string
 *           default: nodejs.png
 */
//  example: ['MongoDB', 'PostgreSQL', 'Firebase']
// databases
/**
 * @openapi
 * components:
 *   schema:
 *     skillsDatabases:
 *       type: object
 *       required:
 *        - name
 *        - logo
 *       properties:
 *         name:
 *           type: string
 *           default: MongoDB
 *         logo:
 *           type: string
 *           default: mongodb.png
 */
//  example: ['Git']
// version_control
/**
 * @openapi
 * components:
 *   schema:
 *     skillsVersionControl:
 *       type: object
 *       required:
 *        - name
 *        - logo
 *       properties:
 *         name:
 *           type: string
 *           default: Git
 *         logo:
 *           type: string
 *           default: git.png
 */
//  example: ['Serverless Framework', 'Heroku', 'Puppeteer', 'Google Analytics']
// other
/**
 * @openapi
 * components:
 *   schema:
 *     skillsOther:
 *       type: object
 *       required:
 *        - name
 *        - logo
 *       properties:
 *         name:
 *           type: string
 *           default: Serverless Framework
 *         logo:
 *           type: string
 *           default: serverless_framework.png
 */
// skillsArray
/**
 * @openapi
 * components:
 *   schema:
 *     skillsArray:
 *       type: object
 *       required:
 *        - tech_stack
 *        - databases
 *        - version_control
 *        - other
 *       properties:
 *         tech_stack:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schema/skillsTechStack'
 *         databases:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schema/skillsDatabases'
 *         version_control:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schema/skillsVersionControl'
 *         other:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schema/skillsOther'
 *     skillsResponseResume:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         tech_stack:
 *           type: string
 *         databases:
 *           type: string
 *         version_control:
 *           type: string
 *         other:
 *           type: string
 */
//  educationArray
/**
 * @openapi
 * components:
 *   schema:
 *     educationArray:
 *       type: object
 *       required:
 *        - university
 *        - branch
 *        - startDate
 *        - endDate
 *        - description
 *       properties:
 *         university:
 *           type: string
 *           default: JNTUK
 *         branch:
 *           type: string
 *           default: CS
 *         startDate:
 *           type: number
 *           default: 2014
 *         endDate:
 *           type: number
 *           default: 2018
 *         description:
 *           type: number
 *           default: Studied Computer Science Engineering
 *     educationResponseResume:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         updatedAt:
 *           type: string
 *         university:
 *           type: string
 *         branch:
 *           type: string
 *         startDate:
 *           type: number
 *         endDate:
 *           type: number
 *         description:
 *           type: string
 */
var educationSchema = new mongoose.Schema({
    active: { type: Boolean, default: true },
    university: { type: String },
    branch: { type: String },
    startDate: { type: String },
    endDate: { type: String },
    description: { type: String },
});
// awardsArray
/**
 * @openapi
 * components:
 *   schema:
 *     awardsArray:
 *       type: object
 *       required:
 *        - awardName
 *        - awardDescription
 *       properties:
 *         awardName:
 *           type: string
 *           default: ABCDEFG
 *         awardDescription:
 *           type: string
 *           default: ABCDEFG
 *     awardsResponseResume:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         updatedAt:
 *           type: string
 *         awardName:
 *           type: string
 *         awardDescription:
 *           type: string
 */
var awardsSchema = new mongoose.Schema({
    awardName: { type: String },
    awardDescription: { type: String },
});
//  projectsArray
/**
 * @openapi
 * components:
 *   schema:
 *     projectsArray:
 *       type: object
 *       required:
 *        - projectName
 *        - projectDescription
 *        - role
 *        - url
 *        - type
 *        - languageUsed
 *       properties:
 *         projectName:
 *           type: string
 *           default: Personal Resume Project
 *         projectDescription:
 *           type: string
 *           default: About Sundar GHimire Personal Resume Project
 *         role:
 *           type: string
 *           default: Full Stack Work
 *         url:
 *           type: string
 *           default: http://sundarghimire.com.np/
 *         type:
 *           type: string
 *           default: Freelance
 *         languageUsed:
 *           type: array
 *           example: ['JS', 'TS', 'Angular']
 *     projectResponseResume:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         updatedAt:
 *           type: string
 *         projectName:
 *           type: string
 *         projectDescription:
 *           type: string
 *         role:
 *           type: string
 *         url:
 *           type: string
 *         type:
 *           type: string
 *         languageUsed:
 *           type: string
 */
var projectsSchema = new mongoose.Schema({
    projectName: { type: String },
    projectDescription: { type: String },
    role: { type: String },
    url: { type: String },
    languageUsed: [String],
    achievements: { type: String },
    type: { type: String, enum: ['Freelance', 'Normal', 'Volunteer'] },
});
//  socialMediaArray
/**
 * @openapi
 * components:
 *   schema:
 *     socialMediaArray:
 *       type: object
 *       required:
 *        - name
 *        - logoURL
 *        - landingLink
 *        - icon
 *       properties:
 *         name:
 *           type: string
 *           default: Linkedin
 *         logoURL:
 *           type: string
 *           default:
 *         landingLink:
 *           type: string
 *           default: https://www.linkedin.com/in/sundar-ghimire/
 *         icon:
 *           type: string
 *           default: fab fa-linkedin-in fa-fw
 *     socialMediaResponseResume:
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
 *           type: string
 *         icon:
 *           type: string
 */
var socialMediaSchema = new mongoose.Schema({
    createdBy: { type: ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: ObjectId, ref: 'User' },
    updatedOn: { type: Date, default: Date.now },
    name: { type: String },
    logoURL: { type: String },
    icon: { type: String },
    landingLink: { type: String },
});
// contactResume
/**
* @openapi
* components:
*   schema:
*     contactResume:
*       type: object
*       required:
*        - email
*        - phone
*        - address
*        - country
*       properties:
*         email:
*           type: string
*           default: sundarghimire.np@gmail.com
*         phone:
*           type: string
*           default: +977-9867041839
*         address:
*           type: string
*           default: Kathamndu Nepal
*         country:
*           type: string
*           default: Nepal
*     contactResponseResume:
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
*           type: string
*         country:
*           type: string
*/
var contactSchema = new mongoose.Schema({
    createdBy: { type: ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: ObjectId, ref: 'User' },
    updatedOn: { type: Date, default: Date.now },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    country: { type: String },
});
// M A I N
/**
 * @openapi
 * components:
 *   schema:
 *     resume:
 *       type: object
 *       required:
 *        - name
 *        - birthday
 *        - role
 *        - careerSummary
 *        - intro
 *        - longIntro
 *        - description
 *        - image
 *        - siteUrl
 *        - active
 *        - copyrightText
 *        - active
 *        - experience
 *        - skills
 *        - socialMedia
 *       properties:
 *         name:
 *           type: string
 *           default: Sundar Ghimire
 *         birthday:
 *           type: string
 *           default: 14 Feb
 *         role:
 *           type: string
 *           default: Full Stack Developer
 *         careerSummary:
 *           type: string
 *           default: Seeking for a challenging position as a COMPUTER SCIENCE ENGINEER, where I can use my innovative ideas and concepts helping the world population for the coziness and improvement in Science and Technology.
 *         intro:
 *           type: string
 *           default: abc
 *         longIntro:
 *           type: string
 *           default: abc
 *         description:
 *           type: string
 *           default: abc
 *         image:
 *           type: string
 *           default: https://ca.slack-edge.com/T6TPDN3B2-UFZ6TLRCL-e2e9ccb974c6-192
 *         siteUrl:
 *           type: string
 *           default: https://sundarghimire.com.np
 *         copyrightText:
 *           type: string
 *           default: © 2022 Sundar Ghimire
 *         active:
 *           type: boolean
 *           default: true
 *         experience:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schema/experienceArray'
 *         skills:
 *           type: object
 *           $ref: '#/components/schema/skillsArray'
 *         education:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schema/educationArray'
 *         awards:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schema/awardsArray'
 *         interests:
 *           type: array
 *           example: ['Cycling', 'Hiking']
 *         language:
 *           type: array
 *           example: ['Nepali(Native)', 'English', 'Hindi']
 *         projects:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schema/projectsArray'
 *         contact:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schema/contactResume'
 *         socialMedia:
 *           type: array
 *           items:
 *             type: object
 *             $ref: '#/components/schema/socialMediaArray'
 *     resumeResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         updatedAt:
 *           type: string
 *         name:
 *           type: string
 *         birthday:
 *           type: string
 *         role:
 *           type: string
 *         careerSummary:
 *           type: string
 *         intro:
 *           type: string
 *         longIntro:
 *           type: string
 *         description:
 *           type: string
 *         image:
 *           type: string
 *         siteUrl:
 *           type: string
 *         copyrightText:
 *           type: string
 *         active:
 *           type: boolean
 *         experience:
 *           type: string
 *         skills:
 *           type: array
 *         socialMedia:
 *           type: array
 */
var resumeSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    createdBy: { type: ObjectId, ref: 'User' },
    updatedBy: { type: ObjectId, ref: 'User' },
    name: { type: String },
    birthday: { type: String },
    role: { type: String },
    careerSummary: { type: String },
    intro: { type: String },
    longIntro: { type: String },
    description: { type: String },
    image: { type: String },
    siteUrl: { type: String },
    copyrightText: { type: String },
    address: { type: String },
    active: { type: Boolean, default: true },
    code: { type: String },
    education: [educationSchema],
    skills: mongoose.Schema.Types.Mixed,
    language: mongoose.Schema.Types.Mixed,
    interests: mongoose.Schema.Types.Mixed,
    others: mongoose.Schema.Types.Mixed,
    experience: [experienceSchema],
    projects: [projectsSchema],
    volunteerWorks: [projectsSchema],
    awards: [awardsSchema],
    contact: [contactSchema],
    socialMedia: [socialMediaSchema],
});
exports.default = mongoose.model('resume', resumeSchema);
//# sourceMappingURL=resume.model.js.map