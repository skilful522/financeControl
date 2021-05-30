const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  privateProducts: [{ type: Types.ObjectId, ref: "PrivateProducts" }],
});

module.exports = model("User", schema);
