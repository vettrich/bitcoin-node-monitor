const express = require('express');
const Client = require('bitcoin-core');

const errorHandler = require('./errorHandler');
const config = require('../config');

const router = express.Router();

/* GET info listing. */
router.get('/', function(req, res, next) {
  // Comment out this line:
  // res.send('respond with a resource');

  const client = new Client({
    host: config.nodeAddress,
    port: config.nodePort,
    // user: 'rpc',
    // password: ''
  });

  client.getBlockchainInformation().then((info) => {
    res.json(info);
  }).error(err => errorHandler(res, err));

  // And insert something like this instead:
  /* res.json([{
    id: 1,
    username: 'asdf'
  }, {
    id: 2,
    username: 'asdf2'
  }]); */
});

module.exports = router;
