"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var roleSchema = new mongoose.Schema({
    roleId: { type: String },
    id: { type: String },
    userTag: [String],
    roleName: { type: String },
    // access: [String],
    // parentRole: String,
    // hasSSO: Boolean,
    // asParticipant: { type: Boolean, default: false },
    // validDays: { type: Number, default: 1 }
    updatedAt: { type: Date, default: Date.now },
    landingPage: { type: String },
    isMFA: Boolean,
    active: { type: Boolean, default: true },
    order: String,
    logoutURL: String,
    firstLoginRedirect: { type: String, default: 'apps/academy' },
    mfaType: { type: String, default: 'email' },
    notes: { type: String },
    roleMenus: { type: String },
    type: String,
    createdBy: { type: ObjectId, ref: 'User' },
    updatedBy: { type: ObjectId, ref: 'User' },
});
exports.default = mongoose.model('roles', roleSchema);
//# sourceMappingURL=role.model.js.map