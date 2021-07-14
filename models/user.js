const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
  vehicles: [{ type: Schema.Types.ObjectId, ref: "Vehicle" }], 
});

UserSchema.pre("findOne", function (next) {
  this.populate("vehicles");
  next();
});

module.exports = mongoose.model("User", UserSchema);