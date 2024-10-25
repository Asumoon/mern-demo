import ResumeModel from './movies.model';
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;
import UploaderController from '../uploader/uploader.controller';
const uploaderController = new UploaderController();

const express = require('express');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


// Set up CSV writer for appending movies
const csvFilePath = path.join(__dirname, './data/movies.csv'); 
const csvWriter = createCsvWriter({
    path: csvFilePath,
    header: [
        { id: 'Movie Name', title: 'title' },
        { id: 'Year of Release', title: 'year' },
        { id: 'Genre', title: 'genre' },
        { id: 'Link to Movie Image', title: 'image' }
    ]
});
export default class MoviesController {

    model = ResumeModel;


    // Helper function to write all movies to CSV
    writeMoviesToCsv = (movies) => {
        return csvWriter.writeRecords(movies);
    };

    // Helper function to read movies from CSV
    readMoviesFromCsv = () => {
        return new Promise((resolve, reject) => {
            const movies = [];
            fs.createReadStream(csvFilePath)
                .pipe(csv())
                .on('data', (row) => {
                    let key = {
                        "title": row['Movie Name'],
                        "genre": row['Genre'],
                        "year": row['Year of Release'],
                        "image": row['Link to Movie Image'],
                    }
                    movies.push(key)
                })
                .on('end', () => resolve(movies))
                .on('error', (err) => reject(err));
        });
    };

    getDetail = async (req, res, next) => {
        try {
            const movies:any = await this.readMoviesFromCsv();
            const page = parseInt(req.query.page) || 1;
            const limit = 15; // Pagination limit with 15
            const startIndex = (page - 1) * limit;
            const paginatedMovies = movies.slice(startIndex, startIndex + limit);
    
            res.json({
                page,
                totalPages: Math.ceil(movies.length / limit),
                data: paginatedMovies
            });
        } catch (error) {
            res.status(500).json({message: 'Error fetching movies', error});
        }

        // const code: string = req.params.code || null;
        // // console.log('---> ', code);
        // this.model.find({ active: true, code: code }).sort({ createdAt: 1 }).exec((_err, data) => {
        //     if (!_err) {
        //         return res.json({ status: 200, message: 'success', data: data });
        //     }
        //     else {
        //         return res.json({ status: 204, message: 'Unable to create', data: data });
        //     }
        // });
    }

    getActiveCode = (req, res, next) => {
        const code: string = req.params.code || null;
        const availableCode = ['2024-resume', 'benekiva-resume', '2025-resume', 'latest'];
        const codeResult = availableCode.includes(code);
        return res.json({ status: 200, result: codeResult });
    }

    getSingleDetail = (req, res, next) => {
        this.model.findById(req.params.id).sort({ createdAt: 1 }).exec((_err, data) => {
            if (!_err) {
                return res.json({ status: 200, message: 'success', data: data });
            }
            else {
                return res.json({ status: 204, message: 'Unable to get lists', data: data });
            }
        });
    }

    createNew = (req, res, _next: any) => {
        const _resume = {
            createdBy: req.user && req.user._id || null,
            name: req.body.name,
            role: req.body.role,
            careerSummary: req.body.careerSummary,
            intro: req.body.intro,
            longIntro: req.body.longIntro,
            description: req.body.description,
            image: req.body.image,
            siteUrl: req.body.siteUrl,
            copyrightText: req.body.copyrightText,
            experience: req.body.experience,
            skills: req.body.skills,
            education: req.body.education,
            awards: req.body.awards,
            interests: req.body.interests,
            language: req.body.language,
            projects: req.body.projects,
            contact: req.body.contact,
            socialMedia: req.body.socialMedia
        };

        this.model.create(_resume, (err, _data) => {
            if (!err) {
                return res.json({ status: 200, message: 'success', data: _resume });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', err: err, data: _resume });
            }
        });
    }



    updateSingle = async (req, res, _next) => {
        const _id = req.params.id;

        // console.log('*****---> ', req.body.experience)

        try {
            const { id } = req.params;
            const { title, director, year, rating } = req.body;

            const movies : any = await this.readMoviesFromCsv();
            const movieIndex = movies.findIndex(movie => movie.id === id);

            if (movieIndex === -1) {
                return res.status(404).json({ message: 'Movie not found' });
            }

            movies[movieIndex] = { id, title, director, year: year.toString(), rating: rating.toString() };
            await this.writeMoviesToCsv(movies);

            res.json(movies[movieIndex]);
        } catch (error) {
            res.status(500).json({ message: 'Error editing movie', error });
        }

        this.model.updateOne({ '_id': ObjectId(_id) }, {
            $set: {
                updatedBy: req.user && req.user._id || null,
                updatedAt: new Date(),
                active: req.body.active,
                name: req.body.name,
                role: req.body.role,
            }
        }).exec(async (err, _data) => {
            const updateData = await this.model.findOne({ _id: ObjectId(_id) }).exec();
            if (!err) {
                return res.json({ status: 200, message: 'success', data: updateData });
            }
            else {
                return res.json({ status: 204, message: 'Unable to create', err: err });
            }
        });
    }


    deleteSingle = (req, res, next) => {
        try {
            const _id = req.params.id;
            this.model.deleteOne({ _id: ObjectId(_id) }).exec((err, resp) => {
                if (!err) {
                    return res.json({ status: 200, message: 'success', id: _id });
                }
                else {
                    return res.json({ status: 404, message: 'Unable to Delete', err: err, id: _id });
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting movie', error });
        }
    }

}
