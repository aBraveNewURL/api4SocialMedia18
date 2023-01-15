const { Schema, model } = require('mongoose');
const Reaction = require('./reactions')


//Thoughts model to handle users thoughs and their reactions.
const thoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
    },
    username: { type: String },
    reactions: [Reaction],
    createdAt: {
        type: Date,
        default: Date.now,
    },
},
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);




const Thoughts = model('Thoughts', thoughtsSchema);

module.exports = Thoughts
