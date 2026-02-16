import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  placeOrderCOD,
  verifyOrder,
  userOrders,
  listOrders,
  updateStatus
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// ================================
// STRIPE PAYMENT ORDER
// ================================
orderRouter.post("/place", authMiddleware, placeOrder);

// ================================
// CASH ON DELIVERY (COD)
// ================================
orderRouter.post("/place-cod", authMiddleware, placeOrderCOD);

// ================================
// STRIPE PAYMENT VERIFY
// ================================
orderRouter.post("/verify", verifyOrder);

// ================================
// USER ORDERS (FRONTEND)
// ================================
orderRouter.post("/userorders", authMiddleware, userOrders);

// ================================
// ADMIN ROUTES
// ================================
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
