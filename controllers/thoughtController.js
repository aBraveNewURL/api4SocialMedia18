const { User, Thoughts} = require('../models')

module.exports={

getAllThoughts(req, res)  {
    Thoughts.find({}, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' })
        }
    })
},

getSingleThought(req, res) {
    Thoughts.findOne({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(200).json(result);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' })
        }
    })
},

addThought(req, res) {
    const newThought = new Thoughts({ thoughtText: req.body.thoughtText, username: req.body.username })
    newThought.save();
    if (newThought) {
        User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: newThought._id } },
            { new: true },
            (err, result) => {
                if (result) {
                    console.log(`Updated: ${result}`);
                } else {
                    console.log(err);
                }
            }
        )
        res.status(200).json(newThought)
    } else {
        console.log('Uh Oh, something went wrong');
        res.status(500).json({ message: 'something went wrong' });
    }
},

updateThought (req, res) {
    Thoughts.findOneAndUpdate(
        { _id: req.params.id },
        {
            thoughtText: req.body.thoughtText,
        },
        { new: true },
        (err, result) => {
            if (result) {
                res.status(200).json(result)
                console.log(`Updated: ${result}`);
            } else {
                console.log('Uh Oh, something went wrong');
                res.status(500).json({ message: 'something went wrong' });
            }
        }
    )
},

deleteThought(req, res) {
    Thoughts.findOne({ _id: req.params.id }, (err, thoughtResult) => {
        User.findOneAndUpdate(
            { username: thoughtResult.username },
            { $pull: { thoughts: req.params.id }},
            { new: true },
            (err, result) => {
                if (result) {
                    console.log(`Updated: ${result}`);
                } else {
                    console.log(err);
                }
            } 
        )
    })

    Thoughts.findOneAndDelete({ _id: req.params.id }, (err, result) => {
        if (result) {
            res.status(200).json(result);
            console.log(`Deleted: ${result}`);
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' });
        }
    })
},

addReaction(req, res) {
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      )
        .then((thoughts) =>
          !thoughts
            ? res.status(404).json({ message: 'No Thought with this id!' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    
},

deleteReaction(req, res) {
    
    Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: {reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
        .then((thoughts) =>
        
          !thoughts
            ? res.status(404).json({ message: 'No Thought with this id!' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
},
}
