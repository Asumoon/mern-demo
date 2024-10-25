const express = require('express');
const router = express.Router();
import * as swaggerUi from 'swagger-ui-express';
const swaggerJsdoc = require('swagger-jsdoc');

import Config from '../config';
const config = Config(process.env.NODE_ENV);

// Note we can go thorough manual process of swagger documentation through this file
// this need to be manage from package.json we nned to copy assets swagger file 
// var swaggerDocument = require('./../assets/swagger.json');

const swaggerDocument = {
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
}


const apiPath = [
  'user',
  // 'settings',
  'movies',
  // 'resume',
  'gallery',
  'gfsFile',
  'uploader',
];

const apiSchemaModel = [
  'user',
  // 'settings',
  'movies',
  // 'resume',
  'gallery',
  'gfsFile',
  'uploader',
];

let apiRoute: String[] = ['./server/auth/index.ts'];
apiPath.forEach(_p => {
  apiRoute.push(`./server/api/${_p}/index.ts`);
});

apiSchemaModel.forEach(_sm => {
  apiRoute.push(`./server/api/${_sm}/${_sm}.model.ts`);
});

var options = {
  definition: swaggerDocument,
  apis: apiRoute,
  explorer: true
};

const openapiSpecification = swaggerJsdoc(options);

// all Routes
router.use('/v1', swaggerUi.serve);
router.get('/v1', swaggerUi.setup(openapiSpecification));

router.get('/docs.json', (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(openapiSpecification)
});

module.exports = router;