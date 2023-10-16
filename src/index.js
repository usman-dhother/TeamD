const express = require('express');
require('dotenv').config();
const functions = require('firebase-functions');
const cors = require('cors');
const routes = require('./routes/index');
const helmet = require('helmet');
const db = require('./database');
const port = 3001;

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());


app.use('/', routes);

app.listen(port, () => {
  console.log(`Express server listening on ${port}`)
})

exports.api = functions.https.onRequest(app)
