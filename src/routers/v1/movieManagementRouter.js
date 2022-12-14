const express = require('express');
const multer  = require('multer')
const upload = multer({ })


const movieManagementController = require('../../controllers/movieManagementController');

const movieManagement = express.Router();

movieManagement.get('/getBanner', movieManagementController.getBanner);

movieManagement.get('/getMovieLists', movieManagementController.getMovieLists);
movieManagement.get(
    '/getMovieListsPagination',
    movieManagementController.getMovieListsPagination
);
movieManagement.get(
    '/getMovieByDate',
    movieManagementController.getMovieByDate
);

movieManagement.post(
    '/uploadPoster',
    upload.single('file'),
    movieManagementController.uploadPosterMovie
);
movieManagement.post('/createMovie', movieManagementController.createMovie);
movieManagement.post('/editMovie', movieManagementController.editMovie);
movieManagement.delete('/removeMovie',movieManagementController.deleteMovie);

module.exports = movieManagement;
