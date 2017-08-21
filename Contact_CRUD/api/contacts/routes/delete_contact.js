const express = require('express');
const mongoose = require('mongoose');
const mongodb = require('mongodb')
const Contact = require('../model/Contacts');
const router = express.Router();

router.route('/:_id')
.delete((req, res) => {

  const _id = req.params._id;
  Contact.deleteOne({ "_id" : _id}, (err, contact) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json({ message: `Contact ${_id} deleted.` });
  });

});

module.exports = router; 