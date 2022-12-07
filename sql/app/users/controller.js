const bcrypt = require("bcrypt");
const saltRounds = 10;
const { user: userDB } = require("../../models");
const { validationResult } = require("express-validator");
module.exports = {
  index: async (req, res) => {
    try {
      let users = await userDB.findAll({
        include: [
          {
            association: "role",
            attributes: ["id", "name"],
          },
        ],
        attributes: ["id", "name", "email", "phoneNumber"],
      });
      return res.send({
        success: true,
        message: "Data berhasil ditemukan",
        data: users,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error,
      });
    }
  },

  detail: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let { id } = req.params;
    let user = await userDB.findOne({
      where: { id },
      include: [
        {
          association: "role",
          attributes: ["id", "name"],
        },
      ],
      attributes: ["id", "name", "email", "phoneNumber"],
    });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User tidak ditemukan",
      });
    }
    try {
      return res.send({
        success: true,
        message: "Data berhasil ditemukan",
        data: user,
      });
    } catch (error) {
      return res.send({
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

    let { password } = req.body;
    password = await bcrypt.hash(password, saltRounds).then((hash) => {
      return hash;
    });
    let payload = { ...req.body, password, roleId: 2 };
    try {
      const createUser = await userDB.create(payload);
      return res.send({
        success: true,
        message: "Data berhasil disimpan",
        data: createUser,
      });
    } catch (error) {
      return res.send({
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
      { id } = req.params;
    let user = await userDB.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User tidak ditemukan",
      });
    }
    if (password) {
      password = await bcrypt.hash(password, saltRounds).then((hash) => {
        return hash;
      });
    }
    let payload = { ...req.body, password };
    try {
      user.set(payload);
      await user.save();
      return res.send({
        success: true,
        message: "Data berhasil diubah",
        data: user,
      });
    } catch (error) {
      return res.send({
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

    let { id } = req.params;
    let user = await userDB.findOne({ where: { id } });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User tidak ditemukan",
      });
    }
    try {
      await user.destroy();
      return res.send({
        success: true,
        message: "Data berhasil dihapus",
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error,
      });
    }
  },
};
