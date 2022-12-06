const UsersDB = require("./model");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

module.exports = {
  index: async (req, res) => {
    try {
      const users = await UsersDB.find().sort({ timestamp: -1 });
      if (users.length === 0) {
        return res.send({
          success: false,
          message: "Data kosong",
        });
      }
      return res.send({
        success: true,
        message: "Data Ditemukan",
        data: users,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: error,
      });
    }
  },

  detail: async (req, res) => {
    let id = req.params.id;
    try {
      const user = await UsersDB.findOne({ _id: id });
      if (!user) {
        return res.send({
          success: false,
          message: "Data tidak ditemukan",
        });
      }
      return res.send({
        success: true,
        message: "Data Ditemukan",
        data: user,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: error,
      });
    }
  },
  create: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let { password } = req.body,
      salt = 10;

    password = await bcrypt.hash(password, salt).then((hash) => {
      return hash;
    });

    const payload = {
      ...req.body,
      password,
    };
    try {
      const userSaved = new UsersDB(payload);
      await userSaved.save();
      return res.send({
        success: true,
        message: "Data berhasil disimpan",
        data: userSaved,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: error,
      });
    }
  },

  update: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    let { password } = req.body,
      id = req.params.id,
      salt = 10;
    if (password) {
      password = await bcrypt.hash(password, salt).then((hash) => {
        return hash;
      });
    }

    let payload = { ...req.body, password: password };
    try {
      await UsersDB.findOneAndUpdate({ _id: id }, { ...payload });
      let userUpdated = await UsersDB.findOne({ _id: id });
      return res.send({
        success: true,
        message: "Data berhasil disimpan",
        data: userUpdated,
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: error,
      });
    }
  },

  remove: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    let id = req.params.id;
    try {
      await UsersDB.findOneAndDelete({ _id: id });
      return res.send({
        success: true,
        message: "Data berhasil dihapus",
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        message: error,
      });
    }
  },
};
