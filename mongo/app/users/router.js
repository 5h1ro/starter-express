var express = require("express");
var router = express.Router();
const { index, detail, create, update, remove } = require("./controller");
const { body } = require("express-validator");

router.get("/", index);
router.get("/:id", detail);
router.post(
  "/",
  body("email")
    .isEmail()
    .withMessage("Format email salah")
    .notEmpty()
    .withMessage("Email tidak boleh kosong"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password harus lebih dari 8 karakter")
    .notEmpty()
    .withMessage("Password tidak boleh kosong"),
  body("name").notEmpty().withMessage("Nama tidak boleh kosong"),
  body("phoneNumber")
    .notEmpty()
    .withMessage("Nomor telepon tidak boleh kosong"),
  create
);
router.put(
  "/:id",
  body("email").optional().isEmail().withMessage("Format email salah"),
  body("password")
    .optional()
    .isLength({ min: 8 })
    .withMessage("Password harus lebih dari 8 karakter"),
  update
);
router.delete("/:id", remove);

module.exports = router;
