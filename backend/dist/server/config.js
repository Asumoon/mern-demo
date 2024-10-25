"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
exports.default = (function (env) {
    var ENV_VARS = dotenv.config();
    var user = encodeURIComponent(process.env.database_USER);
    var password = encodeURIComponent(process.env.database_PASS);
    var envVars = {
        pkg: '../../../package.json',
        securePort: process.env.PORT || 8080,
        devPort: 9090,
        rootFolder: '../../../',
        rootFolderPublic: './',
        apiVersion: '/api/1',
        database_URI: process.env.database_URI,
        isDEV: (process.env.isDEV === '1'),
        secret: 'paperless',
        secrets: { session: 'paperless' },
        tokenSecrets: { session: 'paperless' },
        refreshTokenSecrets: { session: 'khairenibheenjang' },
        // tokenLife: 25,
        tokenLife: 60 * 60 * 24,
        refreshTokenLife: 60 * 60 * 24 * 7,
        isScrambled: (process.env.isScrambled === '1'),
        // List of user roles
        userRoles: ['SADMIN', 'ADMIN', 'USER'],
        // Swagger Start
        appVersion: process.env.appVersion,
        swaggerAPITitle: process.env.swaggerAPITitle,
        swaggerAPIDescription: process.env.swaggerAPIDescription,
        swagger_contact_Name: process.env.swagger_contact_Name,
        swagger_contact_Email: process.env.swagger_contact_Email,
        swagger_contact_URL: process.env.swagger_contact_URL,
        // Swagger End
        UPLOAD_FILE_SIZE_LIMIT: process.env.UPLOAD_FILE_SIZE_LIMIT ? Number(process.env.UPLOAD_FILE_SIZE_LIMIT) : 8 * 1024 * 1024
    };
    switch (env) {
        case 'production':
            envVars.securePort = 443;
            envVars.pkg = envVars.rootFolder + 'package.json';
            break;
        default:
            break;
    }
    return envVars;
});
//# sourceMappingURL=config.js.map