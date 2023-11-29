const express = require('express');
const app = express();
const routes = require('./routes/index');

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)

app.use('*', (_, res) => {
    res.json({
        message: '404 Not Found'
    })
})

module.exports = app
