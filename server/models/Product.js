const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchma = mongoose.Schema(
  {
    writer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 50,
    },
    color: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
    },
    images: {
      type: Array,
      default: [],
    },
    sold: {
      type: Number,
      maxlength: 100,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    modelnames: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchma);
module.exports = { Product };
