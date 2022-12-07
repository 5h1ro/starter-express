const bcrypt = require("bcrypt");
const saltRounds = 10;
const { role: roleDB, user: userDB } = require("../../models");
const db = require("../../models");
const { validationResult } = require("express-validator");
module.exports = {
  index: async (req, res) => {
    try {
      let roles = await roleDB.findAll({
        include: [
          {
            association: "users",
            attributes: ["id", "name", "email", "phoneNumber"],
          },
        ],
        attributes: ["id", "name"],
      });
      return res.send({
        success: true,
        message: "Data berhasil ditemukan",
        data: roles,
      });
    } catch (error) {
      return res.send({
        success: false,
        message: error,
      });
    }
  },
};
