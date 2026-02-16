import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: Object, required: true },

  items: { type: Array, required: true },

  amount: { type: Number, required: true },

  address: { type: Object, required: true },

  // ✅ FIX: status should be String, not Object
  status: {
    type: String,
    default: "Food Processing"
  },

  // ✅ NEW: payment method (COD / STRIPE)
  paymentMethod: {
    type: String,
    default: "COD"   // default = Cash on Delivery
  },

  // ✅ payment status (false = not paid)
  payment: {
    type: Boolean,
    default: false
  },

  date: {
    type: Date,
    default: Date.now
  }
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
