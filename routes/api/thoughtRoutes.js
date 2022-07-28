const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    removeThought,
    createThought,
    updateThought,
    addReaction,
    removeReaction,
} = require ('../../controllers/thoughtController');

