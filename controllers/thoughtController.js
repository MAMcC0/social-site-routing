const { ObjectId } = require('mongoose').Types;
const { Thoughts } = require('../models');




module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
        .then(async (thoughts) =>{
            const thoughtsObj = {
                thoughts,
                reactions: await aggReactions(),
            };
            return res.json(thoughtsObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });

    },

    //get a single thought by its id
    getSingleThought(req, res) {
        Thoughts.findOne({ _id: req.params.thoughtsId })
        .select('-__v')
        .lean()
        .then(async (thought) =>
            !thought
            ? res.status(404).json({ message: "No thought with that ID" })
            : res.json({
                thoughts,
                reactions //do I need a function for this
            })
        )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    //create a new thought


}