const mongoose = require("mongoose");

let userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Nama harus diisi"],
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Roles", userSchema);
