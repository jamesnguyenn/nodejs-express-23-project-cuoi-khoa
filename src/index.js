const express = require('express');
const expressOasGenerator = require('express-oas-generator');
require('dotenv').config();
const app = express();
expressOasGenerator.init(app, {});
app.use(express.json());
app.use(express.static('.'));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With,Content-Type,Accept'
    );
    next();
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('App running on ' + port);
});

const rootRouter = require('./routers/index');

app.use('/api', rootRouter);
