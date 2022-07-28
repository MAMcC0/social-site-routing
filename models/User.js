const { Schema, model } = require('mongoose');
const Thoughts = require('./Thoughts');

const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
      },
      email:{
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please put a vaild email address",],
      },
      thoughts: [{
        type: Schema.Types.ObjectId,
        ref:'Thoughts'
      }],
      friends: [{
        type: Schema.Types.ObjectId,
        ref:'User'
      }],
    },
    {
        toJSON: {
           virtuals: true,
        },
    }
);

userSchema.virtual("friendsCount").get(function (){
 return this.friends.length;

});

const User = model('user', userSchema);

module.exports = User;