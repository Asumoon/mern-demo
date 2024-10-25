"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var role_controller_1 = require("./role.controller");
var controller = new role_controller_1.default();
var express = require('express');
var router = express.Router();
var auth_service_1 = require("../../auth/auth.service");
var auth = new auth_service_1.default();
//
router.get('/all', auth.isAuthenticated(), function (req, res, next) {
    req.ONLY_ROLES = true;
    return next();
}, controller.all);
router.get('/all/:page/:size/:sort/:order/:searchText', auth.isAuthenticated(), controller.all);
router.post('/updateRole', auth.isAuthenticated(), controller.checkRoleBeforeCreating, controller.updateRole, controller.updateEnvironmentVariableRole);
router.get('/getroles', auth.isAuthenticated(), controller.getRolesList);
router.delete('/delete-role', auth.isAuthenticated(), controller.deleteRole);
// router.get('/getparticipantroles', auth.isAuthenticated(), controller.getParticipantRoleList);
router.get('/getSingleRole/:role', auth.isAuthenticated(), controller.getSingleRole);
module.exports = router;
//# sourceMappingURL=index.js.map