const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true },
  calories: { type: String, required: true },
  protein: { type: String, required: true },
  fat: { type: String, required: true },
  carbs: { type: String, required: true },
  price: { type: Number, required: false },
  id: { type: String, required: true, unique: true },
  owner: { type: Types.ObjectId, ref: "User" },
});

module.exports = model("PrivateProducts", schema);
