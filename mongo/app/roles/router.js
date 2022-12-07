var express = require("express");
var router = express.Router();
const { index, create } = require("./controller");

router.get("/", index);
router.post("/", create);

module.exports = router;
