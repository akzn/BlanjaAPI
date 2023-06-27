

const orderModel = require("../models/orders");
const form = require("../helpers/form");
const { ReqMidtransTransaction } = require("../helpers/midtrans");

module.exports = {
  getAllOrdersHistory: (req, res) => {
    const { body } = req;
    console.log("CEK ",req.decodedToken);
    const user_id = req.decodedToken.id;
    const level = req.decodedToken.level_id;


    orderModel
      .getAllOrdersHistory(level, user_id)
      .then((data) => {
        form.nestedAll(res, data);
        // console.log(data);
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },

  getTransactionById: (req, res) => {
    const { id } = req.params;
    const user_id = req.decodedToken.id;
    if (id == null || id == undefined){
      return res.status(400).json({ error: 'id is null or undefined' });
    }
    orderModel
      .getOrderById(id, user_id)
      .then((data) => {
        form.nestedOne(res, data);
        console.log(data)
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },

  getTransactionByCode: (req, res) => {
    const { code } = req.params;
    const user_id = req.decodedToken.id;
  
    orderModel
      .getOrderByCode(code, user_id)
      .then((data) => {
        form.nestedOne(res, data);
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },

  postOrders: async (req, res) => {
    const { body } = req;
    const user_id = req.decodedToken.id;
    const level = req.decodedToken.level_id;

    orderModel
      .postOrders(body, level, user_id)
      .then(async (data) => {

        // request midtrans token
        params = {
          'transaction_code':body.transaction_code,
          'total':data.total
        }
        // midtransTransaction = await ReqMidtransTransaction(params)
        // console.log(midtransTransaction)

        const newResObj = {
          id: data.insertId,
          // midtransData: midtransTransaction,
          ...body,
        };
        form.success(res, newResObj);
      })
      .catch((err) => {
        form.error(res, err);
      });
  },

  getAllOrderHistorySeller: (req, res) => {
    const user_id = req.decodedToken.id;
    console.log(req.decodedToken);
    // const user_id = 7;
    // const level = req.decodedToken.level_id;


    orderModel
      .getAllOrderHistorySeller(user_id)
      .then((data) => {
        form.nestedAll(res, data);
        console.log(data);
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },

  getAllOrderHistoryAdmin: (req, res) => {
    const user_id = req.decodedToken.id;
    console.log(req.decodedToken);

    orderModel
      .getAllOrderHistoryAdmin(user_id)
      .then((data) => {
        form.nestedAll(res, data);
        console.log(data);
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },

  getOrderHistorySellerById: (req, res) => {
    const user_id = req.decodedToken.id;
    const { id } = req.params;

    orderModel
      .getOrderHistorySellerById(id, user_id)
      .then((data) => {
        form.nestedOne(res, data);
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },

  getTransactionByIdforAdmin: (req, res) => {
    const { id } = req.params;
    const user_id = req.decodedToken.id;
  
    orderModel
      .getOrderByIdforAdmin(id, user_id)
      .then((data) => {
        form.nestedAdminOrderDetail(res, data);
      })
      .catch((error) => {
        res.status(500).send({
          message: "failed",
          status: false,
          error: error,
        });
      });
  },

  updateStatusOrder: (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const level = req.decodedToken.level_id;

    orderModel
    .updateStatusOrder(id, body, level)
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err)=> {
      res.status(500).send(err)
      console.log(err);
    });
  }
};