// import BaseCtrl from './../base';
import Role from './role.model';
import { nanoid } from 'nanoid';

export default class RoleCtrl {
    model = Role;

    all = (req, res) => {
        let searchCriteria: any;
        searchCriteria = {};
        // searchCriteria.$and = searchCriteria.$and || [];

        const searchParams = req.params;
        const page = searchParams.page && Number(searchParams.page) || 1;
        const size = searchParams.size && Number(searchParams.size) || 10;

        let skip = 0;
        if (page > 1) {
            skip = page > 0 ? ((page - 1) * size) : 0;
        }
        let sort;
        let $or;
        sort = {}, $or = [];

        if (searchParams.order === 'asc') {
            if (searchParams.sort === 'undefined') {
                sort['updatedAt'] = 1;
            } else {
                sort[searchParams.sort] = 1;
            }
        } else {
            sort[searchParams.sort] = -1;
        }


        if (searchParams.searchText && searchParams.searchText !== 'undefined' && searchParams.searchText !== 'null' && searchParams.searchText.length > 0) {
            searchCriteria.$and = searchCriteria.$and || [];
            $or.push({
                roleName: {
                    '$regex': '(?i).*' + searchParams.searchText + '.*'
                }
            });
            $or.push({
                roleId: {
                    '$regex': '(?i).*' + searchParams.searchText + '.*'
                }
            });
            $or.push({
                landingPage: {
                    '$regex': '(?i).*' + searchParams.searchText + '.*'
                }
            });
            searchCriteria.$and.push({ $or: $or });
        }


        const projection = {
            _id: 1, active: 1, id: 1, type: 1, updatedAt: 1, notes: 1,
            roleId: 1, roleName: 1, userTag: 1, landingPage: 1,
            isMFA: 1, mfaType: 1, logoutURL: 1, firstLoginRedirect: 1
        };

        Role.countDocuments(searchCriteria).exec().then((cnt) => {
            const showNext = (size * page) < cnt;

            Role.aggregate(
                [{ $match: searchCriteria },
                { $project: projection },
                { $sort: sort },
                { $skip: skip },
                { $limit: size }],
                (err, result) => {

                    if (req.ONLY_ROLES) {
                        return res.json(result);
                    }

                    if (err) {
                        return res.status(400).send('Something went wrong. Could not fetch Information');
                    }
                    return res.json({
                        roles: result,
                        showNext: showNext,
                        page: page,
                        size: size,
                        totalCount: cnt
                    });
                    // });
                });
        }, (err) => {
            console.log(err);
            return res.status(500).send({ message: err });
        });
    }

    getRole = (req, res, next) => {
        Role.findOne({ roleId: req.USER.role, active: true }, (err, role) => {
            if (!role){
                console.log(' *** This Role is SUSPENDED Please Contact Support Center. *** ');
                return res.status(404).json({ message: 'This Role is SUSPENDED Please Contact Support Center.' });
            }
            req.ROLE_DETAIL = role;
            next();
        });
    }

    getRolesList = (req, res, next) => {


        let criteria = {};
        // let criteria: any = { parentRole : req.user.role };
        if (req.user.role === 'ADMIN') {
            criteria = {};
        }

        Role.find(criteria, (err, roles) => {
            if (!roles) {
                return res.status(404).json('Roles not found');
            }

            return res.json(roles);
        });
    }

    // getParticipantRoleList = (req, res, next) => {
    //     const criteria: any = { asParticipant : true };        
    //     Role.find(criteria, (err, roles) => {
    //         return res.json(roles);
    //     });
    // }


    getSingleRole = (req, res, next) => {
        Role.findOne({ roleId: req.params.role }).exec().then(role => {
            if (!role) {
                return res.status(404).json('Role detail not found');
            }
            return res.json(role);
        });
    }

    checkRoleBeforeCreating = (req, res, next) => {
        if(req.body && req.body._id) {
            return next();
        } else {
            Role.findOne({ roleId: req.body.roleId }).exec().then(role => {
                if (!role) {
                    return next();
                } else {
                    console.log(` *** Role ${role.roleId} Already exist please try with another Role Id *** `);
                    return res.status(404).json(`Role ${role.roleId} Already exist please try with another Role Id`);
                }            
            });
        }
    }

    updateRole = async (req, res, next) => {

        // console.log('-----req body --> ', req.body);

        if (req.body && req.body._id) {
            if (!req.body.roleId) {
                return res.status(422).json({ success: false, message: 'There is missing Role Id' });
            }
            const roleUpdate = await Role.updateOne({ _id: req.body._id }, {
                roleName: req.body.roleName,
                userTag: req.body.userTag,
                roleId: req.body.roleId,
                updatedAt: new Date(),
                landingPage: req.body.landingPage,
                firstLoginRedirect: req.body.firstLoginRedirect,
                isMFA: req.body.isMFA,
                logoutURL: req.body.logoutURL,
                mfaType: req.body.mfaType,
                type: req.body.type,
                notes: req.body.notes,
                active: req.body.active,
                // access : req.body.accessRoles,
                // hasSSO : req.body.hasSSO,
                // asParticipant: req.body.asParticipant,
                // parentRole : req.body.parentRole,
                // roleMenus : req.body.roleMenus,
                // validDays : req.body.validDays
            });


            if (roleUpdate && roleUpdate.nModified === 1) {
                // return res.status(200).json({ message: 'Success! Role info has been updated successfully.' });
                req.successMessage = 'Success! Role info has been updated successfully.';
                return next();
            }
            return res.status(422).json({ message: 'There is an error saving role. Please try again.' });
        } else {
            const addRole = new Role({
                roleName: req.body.roleName,
                userTag: req.body.userTag,
                roleId: req.body.roleId,
                id: nanoid(8),
                updatedAt: new Date(),
                landingPage: req.body.landingPage,
                firstLoginRedirect: req.body.firstLoginRedirect,
                isMFA: req.body.isMFA,
                logoutURL: req.body.logoutURL,
                mfaType: req.body.mfaType,
                type: req.body.type,
                notes: req.body.notes,
                // asParticipant: req.body.asParticipant,
                // hasSSO: req.body.hasSSO,
                // parentRole : req.body.parentRole,
                // roleMenus : req.body.roleMenus,
                // validDays : req.body.validDays,
                // access : req.body.accessRoles
            });
            console.log('saving');
            addRole.save((err2, savedDoc) => {
                console.log('save');
                if (err2) {
                    console.log('ERROR IN SAVING ROLE');
                    console.log(err2);
                    //   return;
                    return res.status(422).json({ message: 'There is an error saving role. Please try again.', err2 });
                } else {
                    req.successMessage = "Success! Saved.";
                    return next();
                }
                // return res.status(200).json({ 'message': 'Success! Saved.' });
            });
        }
    }

    updateEnvironmentVariableRole = async (req, res, next) => {
        console.log('Update Environment Variable Role todo');

        // TODO Update Env Variable roles system 

        // const oldEnvDoc = await EnvironmentVariable.findOne({});
        // console.log('oldEnvDoc:: ', JSON.stringify(oldEnvDoc));

        // // const newEnvDoc = await EnvironmentVariable.findOneAndUpdate({
        // //     "roleBasedRules.id": {
        // //             $ne: req.body.roleId //only push if array doesn't already contain
        // //         }
        // //     },
        // //     {
        // //         $push: {
        // //             roleBasedRules: {
        // //                 id: req.body.roleId,
        // //                 name: `**** Logged in user is ${req.body.roleId}****`
        // //             }
        // //         }
        // //     },
        // //     { 
        // //         new: true, //return updated doc
        // //         useFindAndModify: false // prevent using of findAndModify
        // //     }
        // // );

        return res.status(200).json({ 'message': req.successMessage });
    }

    deleteRole = (req, res, next) => {

        console.log('------TODO------- Delete Role ');
        console.log('------TODO------- Delete Role ');
        console.log(req.query);
        console.log('------TODO------- Delete Role ');
        console.log('------TODO------- Delete Role ');
        return res.json(true);
    }
}
