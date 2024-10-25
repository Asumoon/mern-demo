import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as http from 'http';
import * as fs from 'fs';

const session = require('express-session');
import setRoutes from './routes';

import Config from './config';
const config = Config(process.env.NODE_ENV);

const app = express();

var cors = require('cors')
app.use(cors()) 
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));

// Point static path to dist
app.use(express.static(config.rootFolderPublic));
app.use(express.static(config.rootFolderPublic + 'dist/public/'));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: config.secret
  }));
  const passport = require('passport');
  app.use(passport.initialize());
  app.use(passport.session());

mongoose.connect(process.env.MONGODB_URI || config.database_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('------> ++++++ Connected MongoDB DB Server ++++++ <------');
    setRoutes(app);
    const server = http.createServer(app);
    server.listen(config.securePort || 8080, () => {
        console.log('Server listening on port ' + config.securePort);
        console.log(' ');
    });

    if (config.isDEV) {
        const app2 = express();
        app2.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
        app2.listen(config.devPort, () => {
            console.log('Listening on port...' + config.devPort);
        });
    }
});

export { app };
