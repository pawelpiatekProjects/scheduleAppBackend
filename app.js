const cors = require('cors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const eventRouter = require('./routes/event');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

//Routes
app.use('/', indexRouter);
app.use('/user', usersRouter);

app.use('/events', eventRouter);
app.use('/auth', authRouter);


app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message: message, data: data});
})

mongoose
    .connect(
        'mongodb+srv://admin:admin@cluster0.de41n.mongodb.net/schedule?retryWrites=true&w=majority'
    )
    .then(result => {
        app.listen(8080);
    })
    .catch(err => console.log(err));


