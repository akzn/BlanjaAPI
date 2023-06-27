const express = require("express");
const paymentRouter = express.Router();
const paymentController = require("../controllers/payments");
const checkToken = require("../helpers/middlewares/checkToken");

//request midrans token
paymentRouter.get("/midtrans/token/:id",checkToken, paymentController.requestMidtranTokenById);
//add midtrans trx 
// paymentRouter.post("/midtrans/", checkToken, paymentController.createMidtrans); // disabled, now midtrans token data inserted straight after token request above

// update midtrans trx with new data
paymentRouter.patch("/midtrans/", checkToken, paymentController.updateMidtrans);
paymentRouter.patch("/midtrans/by-code", checkToken, paymentController.updateMidtransByCode);

// getstatus
paymentRouter.get("/midtrans/get-status/:id", checkToken, paymentController.getTransactionStatusByOrderCode);




module.exports = paymentRouter;
