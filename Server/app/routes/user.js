const express = require('express');
const router = express.Router();

const controller = require ('../controllers/user')

const path = 'user';

router.get(
    `/${path}`,
    controller.getData
)

module.exports = router;