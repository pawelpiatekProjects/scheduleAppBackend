const User = require('../models/user');

exports.getUser = (req, res, next) => {
    // console.log('user id', req.userId)
    User.findById(req.userId).then(user => {
        res.status(200).json({
            user: {
                _id: user._id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone
            }
        })
    }).catch(err => console.log(err))
};
