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

// /api/thoughts/
router.route("/").get(getThoughts).post(createThought);

// /api/thoughts/:thoughtsId
router
    .route('/:thoughtsId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(removeThought);


// /api/thoughts/:thoughtId/reactions   
router
.route('/:thoughtsId/reactions')
.post(addReaction)
.delete(removeReaction);

module.exports = router;