'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));
app.use(cors());

const mongodbUri = 'mongodb://localhost:27017/myDb';
const mongooseUri = uriUtil.formatMongoose(mongodbUri);
const dbOptions = {};

//for http post method
app.use('/api/contacts', require('./api/contacts/routes/post_contact'));
app.use('/api/contacts', require('./api/contacts/routes/get_contact'));
app.use('/api/contacts', require('./api/contacts/routes/delete_contact'));

const hostname = 'localhost';
const port = '3001';

const server = app.listen(port, hostname, () => {
  mongoose.set('debug', true);
  mongoose.connect(mongooseUri, dbOptions, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  
});