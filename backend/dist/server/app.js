"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var bodyParser = require("body-parser");
var express = require("express");
var mongoose = require("mongoose");
var http = require("http");
var session = require('express-session');
var routes_1 = require("./routes");
var config_1 = require("./config");
var config = (0, config_1.default)(process.env.NODE_ENV);
var app = express();
exports.app = app;
var cors = require('cors');
app.use(cors());
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
var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect(process.env.MONGODB_URI || config.database_URI, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('------> ++++++ Connected MongoDB DB Server ++++++ <------');
    (0, routes_1.default)(app);
    var server = http.createServer(app);
    server.listen(config.securePort || 8080, function () {
        console.log('Server listening on port ' + config.securePort);
        console.log(' ');
    });
    if (config.isDEV) {
        var app2 = express();
        app2.use(bodyParser.urlencoded({ extended: true, limit: '20mb' }));
        app2.listen(config.devPort, function () {
            console.log('Listening on port...' + config.devPort);
        });
    }
});
//# sourceMappingURL=app.js.map