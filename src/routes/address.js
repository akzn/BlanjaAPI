// const express = require("express");
// const addressRouter = express.Router();
// const addressController = require("../controllers/address");
// const checkToken = require("../helpers/middlewares/checkToken");
// // const address = require("../models/address");

// addressRouter.get("/", checkToken, addressController.getAddressByUserId);
// addressRouter.post("/", checkToken, addressController.postAddress);
// addressRouter.put("/:id", checkToken, addressController.updateAddress);


// module.exports = addressRouter;

const addressRouter = require("express").Router();
const addressController = require("../controllers/address");
const checkToken = require("../helpers/middlewares/checkToken");

//biteship
const shippingController = require("../controllers/shippingController")

addressRouter.get("/", checkToken, addressController.getAddressByUser);
// addressRouter.get("/:id", checkToken, addressController.getAddressById);
addressRouter.post("/", checkToken, addressController.addAddress);
addressRouter.patch("/set-primary/:id", checkToken, addressController.setPrimaryAddress);
addressRouter.patch("/:id", checkToken, addressController.updateAddress);
addressRouter.delete("/safe-delete/:id", checkToken, addressController.setAddressInactive);
addressRouter.delete("/:id", checkToken, addressController.deleteAddress);

// admin
addressRouter.get("/store", checkToken, addressController.getAddressStore);


module.exports = addressRouter;