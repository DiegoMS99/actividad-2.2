const express = require('express');
const morgan = require('morgan');
const rutasEdificaciones = require('./router/edificaciones.router');
const app = express();

app.set('servidor-puerto', 3030);
app.use(express.json());
app.use(morgan('dev'));
app.use('/api', rutasEdificaciones);

module.exports = { app };
