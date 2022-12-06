const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "Email harus diisi"],
    },

    name: {
      type: String,
      require: [true, "Nama harus diisi"],
    },

    password: {
      type: String,
      require: [true, "Kata sandi harus diisi"],
      select: false,
    },

    phoneNumber: {
      type: String,
      require: [true, "Nomor telepon harus diisi"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Users", userSchema);
