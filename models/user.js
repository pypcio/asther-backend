const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI_USER;
console.log("connecting to server...");

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to users data");
  })
  .catch((error) => {
    console.log("connection error: ", error.message);
  });
const userSchema = mongoose.Schema({
  login: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: false,
  },
});
userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});
module.exports = mongoose.model("User", userSchema);
