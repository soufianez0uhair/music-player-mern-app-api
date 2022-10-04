require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/v1/favTracks', require(path.join(__dirname, 'routes', 'favTracks')));

app.use('/api/user', require(path.join(__dirname, 'routes', 'user')));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        })
    })
    .catch(err => console.log(err))