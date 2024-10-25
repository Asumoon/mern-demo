import * as crypto from 'crypto';
import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';
import Promise = require( "bluebird");
const ObjectId = mongoose.Schema.Types.ObjectId;

const authTypes = [];

/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @openapi
 * components:
 *   schema:
 *     authLogin:
 *       type: object
 *       required:
 *        - password
 *        - email
 *       properties:
 *         password:
 *           type: number
 *           default: kamchainwa
 *         email:
 *           type: string
 *           default: kamchainwa@gmail.com
 */

/**
 * @openapi
 * components:
 *   schema:
 *     refreshToken:
 *       type: object
 *       required:
 *        - refreshToken
 *       properties:
 *         refreshToken:
 *           type: number
 *           default: Token
 */

/**
 * @openapi
 * components:
 *   schema:
 *     user:
 *       type: object
 *       required:
 *        - firstName
 *        - lastName
 *        - password
 *        - email
 *        - phoneNumber
 *        - phoneVerified
 *        - emailVerified
 *        - state
 *        - country
 *       properties:
 *         firstName:
 *           type: string
 *           default: Anutomn
 *         lastName:
 *           type: string
 *           default: Argml
 *         password:
 *           type: number
 *           default: kamchainwa
 *         email:
 *           type: string
 *           default: kamchainwa@gmail.com
 *         phoneNumber:
 *           type: Number
 *           default: +61-0000000000
 *         phoneVerified:
 *           type: Boolean
 *           default: false
 *         emailVerified:
 *           type: Boolean
 *           default: false
 *         state:
 *           type: string
 *           default: New South Wales
 *         country:
 *           type: string
 *           default: Australia
 *     userResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         updatedAt:
 *           type: date
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         password:
 *           type: string
 *         email:
 *           type: string
 *         phoneNumber:
 *           type: Number
 *         phoneVerified:
 *           type: Boolean
 *         emailVerified:
 *           type: Boolean
 *         state:
 *           type: string
 *         country:
 *           type: string
 */

const UserSchema = new Schema({
  client_id: String,
  client_secret: String,
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: ['SADMIN', 'ADMIN', 'USER' ],
    default: 'USER'
  },
  password: {
    type: String,
    required: function() {
      if (authTypes.indexOf(this.provider) === -1) {
        return true;
      } else {
        return false;
      }
    }
  },
  phoneNumber: String,
  phoneVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  salt: String,
  active: { type: Boolean, default: true },
  address: String,
  email: {
    type: String,
    lowercase: true,
    required: function() {
      if (authTypes.indexOf(this.provider) === -1) {
        return true;
      } else {
        return false;
      }
    }
  },
  state: String,
  country: String,
  refrralCode: String,
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: ObjectId, ref: 'User' },
  updatedBy: { type: ObjectId, ref: 'User' },
});



UserSchema
  .path('password')
  .validate(function (password) {
    if (authTypes.indexOf(this.provider) !== -1) {
      return true;
    }
    return password.length;
  }, 'Password cannot be blank');


// Validate email is not taken
UserSchema
  .path('email')
  .validate(function (value, respond) {
    if (authTypes.indexOf(this.provider) !== -1) {
      return true;
    }

    return this.constructor.findOne({ email: value }).exec()
      .then(user => {
        if (user) {
          if (this.id === user.id) {
            return true;
          }
          return false;
        }
        return true;
      })
      .catch(function (err) {
        throw err;
      });
  }, 'The specified email address is already in use.');
// Validate email is not taken e



// Pre-save hook and Encrypt Password
const validatePresenceOf = function (value) {
  return value && value.length;
};
UserSchema
  .pre('save', function (next) {
    const tthis: any = this || {};
    // Handle new/update passwords
    if (!tthis.isModified('password')) {
      return next();
    }

    if (!validatePresenceOf(tthis.password)) {
      if (authTypes.indexOf(tthis.provider) === -1) {
        return next(new Error('Invalid password'));
      } else {
        return next();
      }
    }

    // Make salt with a callback
    tthis.makeSalt((saltErr, salt) => {
      if (saltErr) {
        return next(saltErr);
      }
      tthis.salt = salt;
      tthis.encryptPassword(tthis.password, null, (encryptErr, hashedPassword) => {
        if (encryptErr) {
          return next(encryptErr);
        }
        tthis.password = hashedPassword;

        return next();
      });
    });
  });
  //  Encrypted e


UserSchema.methods = {
  authenticate(password, callback) {
    const tthis: any = this || {};

    if (!callback) {
      return tthis.password === tthis.encryptPassword(password);
    }

    tthis.encryptPassword(password, null, (err, pwdGen) => {
      if (err) {
        return callback(err);
      }

      if (tthis.password === pwdGen) {
        return callback(null, true);
      } else {
        return callback(null, false);
      }
    });
  },

  makeSalt(byteSize, callback) {
    const defaultByteSize = 16;

    if (typeof arguments[0] === 'function') {
      callback = arguments[0];
      byteSize = defaultByteSize;
    } else if (typeof arguments[1] === 'function') {
      callback = arguments[1];
    } else {
      throw new Error('Missing Callback');
    }

    if (!byteSize) {
      byteSize = defaultByteSize;
    }

    return crypto.randomBytes(byteSize, (err, salt) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, salt.toString('base64'));
      }
    });
  },

  encryptPassword(password, checkSalt, callback) {
    const tthis: any = this || {};
    if (!password || !tthis.salt) {
      if (!callback) {
        return null;
      } else {
        return callback('Missing password or salt');
      }
    }

    const defaultIterations = 10000;
    const defaultKeyLength = 64;
    const salt = Buffer.from(checkSalt || tthis.salt, 'base64');

    if (!callback) {
      return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, 'sha512')
        .toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha512', (err, key) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, key.toString('base64'));
      }
    });
  }
};

export default mongoose.model('User', UserSchema);
