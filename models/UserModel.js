const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: function () {
      const nameForUrl = encodeURIComponent(this.name);
      return `https://ui-avatars.com/api/?uppercase=true&name=${nameForUrl}&background=0C4A6E&color=38BDF8`;
    },
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;