"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var movies_model_1 = require("./movies.model");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var uploader_controller_1 = require("../uploader/uploader.controller");
var uploaderController = new uploader_controller_1.default();
var express = require('express');
var path = require('path');
var fs = require('fs');
var csv = require('csv-parser');
var createCsvWriter = require('csv-writer').createObjectCsvWriter;
// Set up CSV writer for appending movies
var csvFilePath = path.join(__dirname, './data/movies.csv');
var csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
        { id: 'title', title: 'Movie Name' },
        { id: 'genre', title: 'Genre' },
        { id: 'year', title: 'Year of Release' },
        { id: 'image', title: 'Link to Movie Image' }
    ]
});
var MoviesController = /** @class */ (function () {
    function MoviesController() {
        var _this = this;
        this.model = movies_model_1.default;
        // Helper function to write all movies to CSV
        this.saveMoviesToCsv = function (movies) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, csvWriter.writeRecords(movies)];
            });
        }); };
        // Helper function to write all movies to CSV
        this.writeMoviesToCsv = function (movies) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var header, csvContent;
            return tslib_1.__generator(this, function (_a) {
                header = ['Movie Name', 'Genre', 'Year of Release', 'Link to Movie Image'];
                csvContent = [header.join(',')].concat(movies.map(function (movie) { return "".concat(movie.title, ",").concat(movie.genre, ",").concat(movie.year, ",").concat(movie.image); })).join('\n');
                fs.writeFileSync(csvFilePath, csvContent, 'utf8');
                return [2 /*return*/];
            });
        }); };
        // Helper function to read movies from CSV
        this.readMoviesFromCsv = function () {
            return new Promise(function (resolve, reject) {
                var movies = [];
                fs.createReadStream(csvFilePath)
                    .pipe(csv())
                    .on('data', function (row) {
                    var key = {
                        "title": row['Movie Name'],
                        "genre": row['Genre'],
                        "year": row['Year of Release'],
                        "image": row['Link to Movie Image'],
                    };
                    movies.push(key);
                })
                    .on('end', function () { return resolve(movies); })
                    .on('error', function (err) { return reject(err); });
            });
        };
        this.getDetail = function (req, res, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var movies, page, limit, startIndex, paginatedMovies, error_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.readMoviesFromCsv()];
                    case 1:
                        movies = _a.sent();
                        page = parseInt(req.query.page) || 1;
                        limit = 15;
                        startIndex = (page - 1) * limit;
                        paginatedMovies = movies.slice(startIndex, startIndex + limit);
                        res.json({
                            page: page,
                            totalPages: Math.ceil(movies.length / limit),
                            data: paginatedMovies
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        res.status(500).json({ message: 'Error fetching movies', error: error_1 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getSingleDetail = function (req, res, next) {
            _this.model.findById(req.params.id).sort({ createdAt: 1 }).exec(function (_err, data) {
                if (!_err) {
                    return res.json({ status: 200, message: 'success', data: data });
                }
                else {
                    return res.json({ status: 204, message: 'Unable to get lists', data: data });
                }
            });
        };
        this.createNew = function (req, res, _next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var newMovie, movies;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newMovie = req.body;
                        return [4 /*yield*/, this.readMoviesFromCsv()];
                    case 1:
                        movies = _a.sent();
                        movies.push(newMovie);
                        return [4 /*yield*/, this.saveMoviesToCsv(movies)];
                    case 2:
                        _a.sent();
                        res.status(201).json(newMovie);
                        return [2 /*return*/];
                }
            });
        }); };
        this.updateSingle = function (req, res, _next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var title_1, updatedMovie, movies, movieIndex, error_2;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        title_1 = req.params.title;
                        updatedMovie = req.body;
                        return [4 /*yield*/, this.readMoviesFromCsv()];
                    case 1:
                        movies = _a.sent();
                        movieIndex = movies.findIndex(function (m) { return m.Title === title_1; });
                        if (movieIndex === -1)
                            return [2 /*return*/, res.status(404).json({ message: 'Movie not found' })];
                        movies[movieIndex] = updatedMovie;
                        return [4 /*yield*/, this.writeMoviesToCsv(movies)];
                    case 2:
                        _a.sent();
                        res.json(updatedMovie);
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        res.status(500).json({ message: 'Error editing movie', error: error_2 });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.deleteSingle = function (req, res, next) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var title_2, movies, updatedMovies, error_3;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        title_2 = req.params.title;
                        return [4 /*yield*/, this.readMoviesFromCsv()];
                    case 1:
                        movies = _a.sent();
                        updatedMovies = movies.filter(function (m) { return m.Title !== title_2; });
                        // Check if the movie to delete was found
                        if (movies.length === updatedMovies.length) {
                            return [2 /*return*/, res.status(404).json({ message: 'Movie not found' })];
                        }
                        // await this.writeMoviesToCsv(updatedMovies);
                        res.status(204).end();
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        res.status(500).json({ message: 'Error deleting movie', error: error_3 });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
    }
    return MoviesController;
}());
exports.default = MoviesController;
//# sourceMappingURL=movies.controller.js.map