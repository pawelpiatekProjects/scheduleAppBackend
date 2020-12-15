const Event = require('../models/event');
const User = require('../models/user');

exports.createEvent = (req, res, next) => {
    const body = req.body;
    console.log('body', body);
    let creator;
    const event = new Event({
        name: body.name,
        date: body.date,
        hour: body.hour,
        description: body.description,
        creator: body.userId
    });
    event.save().then(() => {
        return User.findById(body.userId);
    }).then(user => {
        creator = user;
        console.log('test creator', creator);
        user.events.push(event);
        return user.save()
    }).then(result => {
        res.status(201).json({
            message: 'Created event',
            event: event,
            creator: {
                _id: creator._id,
                name: creator.name
            }
        })
    }).catch(err => {
        console.log('Error', err);
    })
}

exports.getEvents = (req, res, next) => {
    console.log('user id', req.userId)
    Event.find({creator: req.userId.toString()}).then(events => {
        res.status(200).json({
            events: events
        })
    }).catch(err => console.log(err));
}

exports.getEvent = () => {

}
