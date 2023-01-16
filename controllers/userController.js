const { User } = require('../models')

module.exports = {

    getAllUsers(req, res) {
        User.find({}, (err, result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                console.log('Uh Oh, something went wrong');
                res.status(500).json({ message: 'something went wrong' })
            }
        })
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.id }, (err, result) => {
            if (result) {
                res.status(200).json(result);
            } else {
                console.log('Uh Oh, something went wrong');
                res.status(500).json({ message: 'something went wrong' })
            }
        })
    },

    addUser(req, res) {
        const newUser = new User({ username: req.body.username, email: req.body.email })
        newUser.save();
        if (newUser) {
            res.status(200).json(newUser._id)
        } else {
            console.log('Uh Oh, something went wrong');
            res.status(500).json({ message: 'something went wrong' });
        }
    },

    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            {
                username: req.body.username,
                email: req.body.email
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

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id }, (err, result) => {
            if (result) {
                res.status(200).json(result);
                console.log(`Deleted: ${result}`);
            } else {
                console.log('Uh Oh, something went wrong');
                res.status(500).json({ message: 'something went wrong' });
            }
        })
    },


    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { friends: req.params.friendId } },
            { new: true },
            (err, result) => {
                if (result) {
                    res.status(200).json(result),
                        console.log(`Updated: ${result}`)
                } else {
                    console.log('Uh Oh, something went wrong');
                    res.status(500).json({ message: 'something went wrong' });
                }
            }
        )
    },

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: req.params.friendId } },
            { new: true },
            (err, result) => {
                if (result) {
                    res.status(200).json(result),
                        console.log(`Updated: ${result}`)
                } else {
                    console.log('Uh Oh, something went wrong');
                    res.status(500).json({ message: 'something went wrong' });
                }
            }
        )
    },
}