import RoleCtrl from './role.controller';
const controller = new RoleCtrl();
const express = require('express');
const router = express.Router();
import AuthService from '../../auth/auth.service';
const auth = new AuthService();

//
router.get('/all',
    auth.isAuthenticated(),
    (req, res, next) => {
        req.ONLY_ROLES = true;
        return next();
    },
    controller.all
);
router.get('/all/:page/:size/:sort/:order/:searchText', auth.isAuthenticated(), controller.all);

router.post('/updateRole',
    auth.isAuthenticated(),
    controller.checkRoleBeforeCreating,
    controller.updateRole,
    controller.updateEnvironmentVariableRole
);

router.get('/getroles', auth.isAuthenticated(), controller.getRolesList);
router.delete('/delete-role', auth.isAuthenticated(), controller.deleteRole);
// router.get('/getparticipantroles', auth.isAuthenticated(), controller.getParticipantRoleList);
router.get('/getSingleRole/:role', auth.isAuthenticated(), controller.getSingleRole);


module.exports = router;
