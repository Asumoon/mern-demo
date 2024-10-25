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
        { id: 'title', title: 'Movie Name' },
        { id: 'genre', title: 'Genre' },
        { id: 'year', title: 'Year of Release' },
        { id: 'image', title: 'Link to Movie Image' }
    ]
});
export default class MoviesController {

    model = ResumeModel;


    // Helper function to write all movies to CSV
    saveMoviesToCsv = async (movies) => {
        return csvWriter.writeRecords(movies);
    };

     // Helper function to write all movies to CSV
     writeMoviesToCsv = async (movies) => {
        const header = ['Movie Name',  'Genre', 'Year of Release', 'Link to Movie Image'];
        const csvContent = [header.join(',')].concat(
            movies.map((movie) => `${movie.title},${movie.genre},${movie.year},${movie.image}`)
        ).join('\n');

        fs.writeFileSync(csvFilePath, csvContent, 'utf8');
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
            const movies: any = await this.readMoviesFromCsv();
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
            res.status(500).json({ message: 'Error fetching movies', error });
        }
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

    createNew = async (req, res, _next: any) => {
        const newMovie = req.body;
        const movies: any = await this.readMoviesFromCsv();

        movies.push(newMovie);
        await this.saveMoviesToCsv(movies);

        res.status(201).json(newMovie);
    }



    updateSingle = async (req, res, _next) => {
        try {
            const title = req.params.title;
            const updatedMovie = req.body;
            let movies: any = await this.readMoviesFromCsv();

            const movieIndex = movies.findIndex((m) => m.Title === title);
            if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' });

            movies[movieIndex] = updatedMovie;
            await this.writeMoviesToCsv(movies);

            res.json(updatedMovie);
        } catch (error) {
            res.status(500).json({ message: 'Error editing movie', error });
        }
    }


    deleteSingle = async (req, res, next) => {
        try {
            const title = req.params.title;
            let movies: any = await this.readMoviesFromCsv();

            const updatedMovies = movies.filter((m) => m.Title !== title);
            // Check if the movie to delete was found
            if (movies.length === updatedMovies.length) {
              return res.status(404).json({ message: 'Movie not found' });
            }
            // await this.writeMoviesToCsv(updatedMovies);

            res.status(204).end();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting movie', error });
        }
    }

}
