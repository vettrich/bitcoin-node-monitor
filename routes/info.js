const express = require('express');
const Client = require('bitcoin-core');

const errorHandler = require('./errorHandler');
const config = require('../config');

const router = express.Router();

/* GET info listing. */
router.get('/', function(req, res, next) {
  const client = new Client({
    host: config.nodeAddress,
    port: config.nodePort,
    // user: 'rpc',
    // password: ''
  });

  client.getBlockchainInformation().then((info) => {
    res.json(info);
  }).error(err => errorHandler(res, err));
});

module.exports = router;
