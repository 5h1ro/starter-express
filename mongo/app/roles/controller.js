const rolesDB = require("./model");
module.exports = {
  index: async (req, res) => {
    let roles = await rolesDB.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "roleId",
          as: "users",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          "users._id": 1,
          "users.email": 1,
          "users.name": 1,
          "users.phoneNumber": 1,
        },
      },
    ]);
    return res.send({ success: true, message: "Data Ditemukan", data: roles });
  },

  create: async (req, res) => {
    let roles = new rolesDB(req.body);
    await roles.save();
    return res.send({
      success: true,
      message: "Data Berhasil Dimasukkan",
      data: roles,
    });
  },
};
