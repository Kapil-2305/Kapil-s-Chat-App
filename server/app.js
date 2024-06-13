const express = require('express'); // Web framework for Node.js

const routes = require('./routes/index'); // Import routes

const morgan = require('morgan'); // HTTP request logger middleware for Node.js

const rateLimit = require('express-rate-limit'); // Basic rate-limiting middleware for Express

const helmet = require('helmet'); // Helps secure Express apps by setting various HTTP headers

const mongosanitize = require('express-mongo-sanitize'); // Express middleware to sanitize user-supplied data to prevent MongoDB Operator Injection

const bodyParser = require('body-parser'); // Node.js body parsing middleware

const xss = require('xss'); // Express middleware to sanitize user input coming from POST body, GET queries, and url params

const cors = require('cors'); // Express middleware to enable CORS with various options

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(mongosanitize());
// app.use(xss());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,
}));

app.use(express.json({limit: "10kb"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(helmet());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 3000,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour'
});
app.use('/tawk', limiter);

app.use(routes);

module.exports = app;