
const { User, Thoughts } = require('../models');


module.exports = {
//get all users
    getUsers(req,res){
        User.find()
       .then((users) => res.json(users))
       .catch((err) => res.status(500).json(err));
    },
// get a single user
    getSingleUser(req,res) {
        User.findOne({_id: req.params.userId})
        .select('-__v')
        .then((user) =>
        !user? res.status(404).json({message: 'No user found with that ID!'})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    //delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId})
        .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID'})
                : Thoughts.deleteMany({_id: { $in: user.thoughts} })
        )
        .then(() => res.json({ message: 'User and thoughts deleted!'}))
        .catch((err) => res.status(500).json(err));
    },

    //create a user
    createUser(req, res) {
        User.create(req.body)
        .then((user) => res.json(user))
        .catch((err)=> {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    //update User
    updateUser( req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId},
            { $set: req.body},
            { runValidators: true, new: true}
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user with this ID! ' })
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    createFriend(req,res){
        User.findOneAndUpdate(
            {_id: req.params.userId},
            { $addToSet: { friend: req.body}},
            { runValidators: true, new:true}
        )
        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user found with that ID'})
        : res.json(thoughts)
        )

        .catch((err) => res.status(500).json(err));
    },

    deleteFriend(req,res){
        User.findOneAndUpdate(
            { _id: req.params.thoughtsId },
            { $pull: { friend: { friendId: req. params.friendId }}},
            { runValidators: true, new: true}
        )

        .then((user) =>
        !user
        ? res.status(404).json({ message: 'No user found with that ID'})
        : res.json(user)
        )

        .catch((err) => res.status(500).json(err));

    }
}