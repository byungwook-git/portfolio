const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchma = mongoose.Schema(
  {
    user: {
      type: Array,
      default: [],
    },
    data: {
      type: Array,
      default: [],
    },
    product: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchma);
module.exports = { Payment };
