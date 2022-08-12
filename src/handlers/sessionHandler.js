const session = require('express-session');
const MongoStore = require('connect-mongo');

//----Express Session Setup/Configs----
module.exports = session({
    secret: 'tactical rower',
    store: MongoStore.create({mongoUrl: process.env.CONNECTION_URI}),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // seven days in milliseconds.
        httpOnly: true
    }
});