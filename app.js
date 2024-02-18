const express = require('express');
const rootRouter = require('./routes/rootRouter');
const {errorHandler} = require('./errorHandler');
const app = express();

const bodyParser = express.json();


app.use(bodyParser);
app.use('/api', rootRouter);
app.use(express.static('public/images'));

app.use(errorHandler);

module.exports = app;