const express = require("express");
const orders = express.Router();
const ordersController = require("../controllers/orders");
const checkToken = require("../helpers/middlewares/checkToken");

orders.get("/", checkToken, ordersController.getAllOrdersHistory);
orders.get("/seller", checkToken, ordersController.getAllOrderHistorySeller);
orders.get("/admin", checkToken, ordersController.getAllOrderHistoryAdmin);
orders.get("/seller/:id", checkToken, ordersController.getOrderHistorySellerById);
orders.get("/:id", checkToken, ordersController.getTransactionById);
orders.get("/transaction-code/:code", checkToken, ordersController.getTransactionByCode);
orders.get("/adm/:id", checkToken, ordersController.getTransactionByIdforAdmin);
orders.put("/seller/:id", checkToken, ordersController.updateStatusOrder);
orders.post("/", checkToken, ordersController.postOrders);




// getAllOrderHistorySeller

module.exports = orders;