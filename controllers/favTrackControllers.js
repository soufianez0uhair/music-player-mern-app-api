const FavTrack = require('../models/favTrackModel');
const mongoose = require('mongoose');

const getFavTracks = async (req, res) => {
    const {_id} = req.user;
    const favTracks = await FavTrack.find({userId: _id}).sort({createdAt: -1});
    
    if(!favTracks) {
        return res
                  .status(400)
                  .json({
                    status: 'fail',
                    message: 'No track was found!'
                  })
    }

    return res
              .status(200)
              .json({
                status: 'success',
                data: {
                    favTracks
                }
              })
}

const createFavTrack = async (req, res) => {
    const {_id} = req.user;
    const {id, title, cover, artist, preview} = req.body;

    try {
        const favTrack = await FavTrack.addTrack({id, title, cover, artist, preview, userId: _id});

        return res
                  .status(200)
                  .json({
                    status: 'success',
                    data: {
                        favTrack
                    }
                  })
    } catch(err) {
        return res
                  .status(400)
                  .json({
                  status: 'fail',
                  message: err.message
                  })
    }
}

const getFavTrack = async (req, res) => {
    const {id} = req.params;
    const {_id} = req.user;

    try {
        const favTrack = await FavTrack.findOne({id, userId: _id});

        return res
                  .status(200)
                  .json({
                    status: 'success',
                    data: {
                        favTrack
                    }
                  })
    } catch(err) {
        return res
                  .status(400)
                  .json({
                    status: 'fail',
                    message: err.message
                  })
    }
}

const deleteFavTrack = async (req, res) => {
    const {id} = req.params;
    const {_id} = req.user;

    const favTrack = await FavTrack.findOneAndDelete({id, userId: _id});

    if(!favTrack) {
        return res
                  .status(400)
                  .json({
                  status: 'fail',
                  message: 'No such track was found in your favorite tracks!'
                  })
    }

    return res
              .status(200)
              .json({
                status: 'success',
                data: {
                    favTrack
                }
              })
} 

module.exports = {getFavTracks, createFavTrack, getFavTrack, deleteFavTrack}