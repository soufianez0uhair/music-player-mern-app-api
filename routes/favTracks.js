const express = require('express');
const { getFavTracks, createFavTrack, getFavTrack, deleteFavTrack } = require('../controllers/favTrackControllers');
const { requireAuth } = require('../middleware/requireAuth');

const router = express.Router();

router
    .use(requireAuth)
    .get('/', getFavTracks)
    .post('/', createFavTrack)
    .get('/:id', getFavTrack)
    .delete('/:id', deleteFavTrack)

module.exports = router