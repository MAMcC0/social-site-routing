const { ObjectId } = require('mongoose').Types;
const { Thoughts, User } = require('../models');




module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thoughts.find()
        .then(async (thoughts) =>{
            const thoughtsObj = {
                thoughts
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
        .then(async (thoughts) =>
            !thoughts
            ? res.status(404).json({ message: "No thought with that ID" })
            : res.json({
                thoughts
            })
        )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // create a thought
    createThought(req, res) {
        Thoughts.create(req.body)
        User.findOneAndUpdate(
            {_id: req.params.userId },
            { $addToSet: { thoughts: req.body} },
            { runValidators: true, new: true}
        )
        .then((user) =>
            !user
            ? res
                .status(404).json({ message: 'No user found with that ID'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

//updating a thought
    updateThought(req, res) {
        Thoughts.findOneAndUpdate (
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true}
        )
        .then((thoughts) => 
        !thoughts
            ? res.status(404).json({ message: "No thought found with that Id" })
            : res.json(thoughts)        
        )
        .catch((err) => res.status(500).json(err));
    },
//would we remove a thought by assoc user or just thought
    removeThought(req, res) {
        Thoughts.findOneAndRemove({ _id: req.params.thoughtsId })
        .then((thoughts) =>
         !thoughts  
         ? res.status(404).json({ message: "No thought exists "})
         : User.findOneAndUpdate(
            { thoughts: req.params.thoughtsId },
            { $pull : { thoughts: req.params.thoughtsId} },
            { new: true }
         )
        )
        .then((thoughts) =>
        !thoughts
        ? res.status(404).json({ message: 'Thought deleted, but no User found'})
        : res.json({ message: "Thought deleted!"})
        )

        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },



    //create a reaction
    addReaction(req, res){
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true}
        )
        .then((thoughts) =>
        !thoughts
        ? res.status(404).json({ message: 'No thought found with that ID'})
        : res.json(thoughts)
        )
        .catch((err)=> res.status(500).json(err));
    },
// to delete a reaction
    removeReaction(req, res){
        Thoughts.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $pull: { reaction: { reactionId: req. params.reactionId }}},
            { runValidators: true, new: true}
        )

        .then((thoughts) =>
        !thoughts
        ? res.status(404).json({ message: 'No thought found with that ID'})
        : res.json(thoughts)
        )

        .catch((err) => res.status(500).json(err));
    },
};