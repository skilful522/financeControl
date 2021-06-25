const { Schema, model } = require("mongoose");

const schema = new Schema({
  productId: String, data: String ,
});

module.exports = model("ProductImage", schema);
