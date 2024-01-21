const express = require('express');
const router = express.Router();

router.get('/generatewords', require("./wordgenerator/index.js"))
router.get("/image", require("./image/index.js"))

//router.get("/upload/:key/:url", require("./writeImage/index.js"))

module.exports = router