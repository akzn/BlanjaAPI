


const shippingRouter = require("express").Router();
const checkToken = require("../helpers/middlewares/checkToken");

//biteship
const shippingController = require("../controllers/shippingController")

// biteship API
shippingRouter.get("/maps", checkToken, shippingController.fetchMapsByTerm)
shippingRouter.post("/rates/couriers", checkToken, shippingController.fetchRatesCouriers)
shippingRouter.get("/detail/:code", checkToken, shippingController.fetchShipmentByCode)
shippingRouter.post("/tracking-number", checkToken, shippingController.insertTrackingNumber)
shippingRouter.get("/tracking", checkToken, shippingController.fetchTrackingData)
shippingRouter.get("/checkstatus", checkToken, shippingController.checkShippingStatus)


module.exports = shippingRouter;