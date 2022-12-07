var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  return res.send({
    success: true,
    message: "Welcome to express.js",
  });
});

module.exports = router;
