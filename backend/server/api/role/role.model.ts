import * as mongoose from 'mongoose';
const ObjectId = mongoose.Schema.Types.ObjectId;

const roleSchema = new mongoose.Schema({
   roleId: {type: String},  // unique Id 
   id: {type: String},  // unique Id 
   userTag: [String],  // tag of the user willbe used for all roles
   roleName: {type: String},
   // access: [String],
   // parentRole: String,
   // hasSSO: Boolean,
   // asParticipant: { type: Boolean, default: false },
   // validDays: { type: Number, default: 1 }
   updatedAt: { type: Date, default: Date.now },
   landingPage: {type: String},
   isMFA: Boolean,
   active: { type: Boolean, default: true },
   order: String,
   logoutURL: String,
   firstLoginRedirect: { type: String, default: 'apps/academy' },
   mfaType: { type: String, default: 'email' },   // email ~  sms
   notes: {type: String},
   roleMenus: {type: String},
   type: String,  // need to check up no nned in our model
   createdBy: { type: ObjectId, ref: 'User' },
   updatedBy: { type: ObjectId, ref: 'User' },
});

export default mongoose.model('roles', roleSchema);
