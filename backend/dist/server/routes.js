"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var config_1 = require("./config");
var config = (0, config_1.default)(process.env.NODE_ENV);
exports.default = (function (app) {
    app.get('/api', function (req, res) {
        console.log('server is started on 8080 test last');
        console.log('==> ' + config.apiVersion);
        res.send([{ message: "Welcome to server API v-".concat(config.apiVersion) }]);
    });
    app.use('/api/docs', require('./apiDoc'));
    app.use('/api/auth', require('./auth'));
    app.use('/api/settings', require('./api/settings'));
    app.use('/api/user', require('./api/user'));
    app.use('/api/roles', require('./api/role'));
    // File
    app.use('/api/stream', require('./api/gfsFileUpload/index'));
    app.use('/api/file', require('./api/gfsFile/index'));
    app.use('/api/gallery', require('./api/gallery/index'));
    app.use('/api/uploader', require('./api/uploader/index'));
    app.use('/api/movies', require('./api/movies'));
    // All other routes should redirect to the index.html
    // Angular UI Control route
    app.route('/*')
        .get(function (req, res) {
        res.sendFile(path.resolve("./dist/public/index.html"));
    });
    //   switch (process.env.NODE_ENV) {
    //     case 'production':
    //       app.use(express.static(config.rootFolder));
    //       app.use(express.static(config.rootFolder + 'public/'));
    //       app.route('/*')
    //         .get((req, res) => {
    //           res.sendFile(path.resolve(`./public/index.html`));
    //       });
    //     break;
    //     default:
    //       app.use(express.static('./src/'));
    //       app.route('/*')
    //       .get((req, res) => {
    //         console.log('********************', req.body);
    //         res.sendFile(path.resolve(`./src/index.html`));
    //     });
    //     break;
    //   }
});
//# sourceMappingURL=routes.js.map