const express = require('express');
const {body} = require('express-validator/check');
const isAuth = require('../middleware/isAuth');

const eventsController = require('../controllers/event');

const router = express.Router();

router.post('/new', isAuth, eventsController.createEvent);

router.post('/delete', isAuth, eventsController.deleteEvent);

router.get('/all', isAuth, eventsController.getEvents);

router.get('/all/:id', isAuth, eventsController.getEvent);


module.exports = router;
