require('dotenv').config();
// ----App----
const express = require('express');
const app = express();

const mongoose = require('mongoose');
//----MongoDB Connection----
mongoose.connect(process.env.CONNECTION_URI)
    .then(() => {
        app.emit('DB Connected');
    })
    .catch(e => console.log(e));

const sessionOptions = require('./src/handlers/sessionHandler');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
//const helmet = require('helmet');
const csrf = require('csurf');
const {globalMiddleware} = require('./src/middlewares/globalMiddlewares');
const {checkCsrfError, csrfMiddleware} = require('./src/middlewares/csrfMiddlewares');

//----Middlewares section----
app.use(express.json());
app.use(express.urlencoded({extended: true})); // to treat req.body
app.use(express.static(path.resolve(__dirname, 'public'))); // static files dir
//app.use(helmet()); // Disabled in localhost
app.use(sessionOptions);
app.use(csrf());
app.use(flash());
app.set('views', path.resolve(__dirname, 'src', 'views')); // set views dir
app.set('view engine', 'ejs'); // set view engine

// ----Own middlewares----
// Every requisition will go through these created middlewares.
app.use(globalMiddleware);
app.use(csrfMiddleware); 
app.use(checkCsrfError);

//----Routes----
app.use(routes);

//----Server Listen----
app.on('DB Connected', () => {
    app.listen(3000, () => {
        console.log('Server is up at http://localhost:3000')
    });
})

