const User = require("../models/user.js");
const bcypt = require("bcrypt");
const locationController = require("./APIsController.js");
const { asyncHandler } = require("../middleware/asyncHandler.js");
const { findUserById } = require("../servises/userServise.js");
//get 1 User
const getUser = asyncHandler(async (req, res) => {
  const user = await findUserById(req.user.id);
  res.json(user);
});
//get users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
//delete user
const deleteUser = asyncHandler(async (req, res) => {
  await User.findByIdAndRemove(req.user.id);
  res.status(204).end();
});
//change password
const updateUserPassword = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { password, newPassword } = req.body;

  const user = await findUserById(id);
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Incorrect password" });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await updateUser(id, { password: hashedPassword });
  res.status(200).json({ message: "Password updated successfully" });
});

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  updateUserPassword,
};
