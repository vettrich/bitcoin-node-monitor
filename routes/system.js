const express = require('express');
const router = express.Router();
const os = require('os');
const osUtils = require('os-utils');
const si = require('systeminformation');
const disk = require('diskusage');
const promisify = require('util.promisify');
const debug = require('debug')('app:system');
const config = require('../config');

const diskCheckPromise = promisify(disk.check);

/* GET info listing. */
router.get('/', (req, res /* , next */) => {
  const data = {
    memoryTotal: os.totalmem(),
    memoryUsed: os.totalmem() - os.freemem(),
  };

  const promiseCurrentLoad = si.currentLoad()
    .then(load => ({
      cpuUsed: load.currentload,
    }));

  const promiseDiskCheck = diskCheckPromise(config.mountPath)
    .then(info => ({
      diskTotal: info.total,
      // diskFree: info.free,
      diskUsed: info.total - info.free,
    }));

  Promise.all([promiseCurrentLoad, promiseDiskCheck])
    .then(([promiseCurrentLoadResult, promiseDiskCheckResult]) => {
      res.json(Object.assign({}, data, promiseCurrentLoadResult, promiseDiskCheckResult));
    })
    .catch((err) => {
      debug('ERROR: ', err);
      res.json({
        success: false,
        error: err,
      });
    });
});

module.exports = router;
