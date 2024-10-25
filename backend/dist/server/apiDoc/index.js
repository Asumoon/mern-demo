"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var router = express.Router();
var swaggerUi = require("swagger-ui-express");
var swaggerJsdoc = require('swagger-jsdoc');
var config_1 = require("../config");
var config = (0, config_1.default)(process.env.NODE_ENV);
// Note we can go thorough manual process of swagger documentation through this file
// this need to be manage from package.json we nned to copy assets swagger file 
// var swaggerDocument = require('./../assets/swagger.json');
var swaggerDocument = {
    openapi: "3.0.0",
    info: {
        version: config.appVersion,
        contact: {
            name: config.swagger_contact_Name,
            email: config.swagger_contact_Email,
            url: config.swagger_contact_URL
        },
        title: config.swaggerAPITitle,
        description: config.swaggerAPIDescription,
        license: {
            name: "MIT",
            url: "https://opensource.org/licenses/MIT"
        }
    },
    components: {
        securitySchemas: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    security: [
        {
            bearerAuth: []
        }
    ]
};
var apiPath = [
    'user',
    // 'settings',
    'movies',
    // 'resume',
    'gallery',
    'gfsFile',
    'uploader',
];
var apiSchemaModel = [
    'user',
    // 'settings',
    'movies',
    // 'resume',
    'gallery',
    'gfsFile',
    'uploader',
];
var apiRoute = ['./server/auth/index.ts'];
apiPath.forEach(function (_p) {
    apiRoute.push("./server/api/".concat(_p, "/index.ts"));
});
apiSchemaModel.forEach(function (_sm) {
    apiRoute.push("./server/api/".concat(_sm, "/").concat(_sm, ".model.ts"));
});
var options = {
    definition: swaggerDocument,
    apis: apiRoute,
    explorer: true
};
var openapiSpecification = swaggerJsdoc(options);
// all Routes
router.use('/v1', swaggerUi.serve);
router.get('/v1', swaggerUi.setup(openapiSpecification));
router.get('/docs.json', function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(openapiSpecification);
});
module.exports = router;
//# sourceMappingURL=index.js.map