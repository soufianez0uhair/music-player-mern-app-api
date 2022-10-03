const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const favTrackSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    preview: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {timestamps: true})

favTrackSchema.statics.addTrack = async function(track) {
    const exists = await this.findOne({id: track.id, userId: track.userId});

    if(exists) {
        throw Error('This track is already exist in your favorite tracks!')
    }

    const favTrack = await this.create({id: track.id, title: track.title, cover: track.cover, artist: track.artist, preview: track.preview, userId: track.userId});

    return favTrack
}

module.exports = mongoose.model('Favtrack', favTrackSchema);