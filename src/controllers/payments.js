const orderModel = require("../models/orders");
const form = require("../helpers/form");
const { ReqMidtransTransaction } = require("../helpers/midtrans");

module.exports = {
    test: async (req, res) => {
        params = {
            'transaction_code':1,
            'total':2
        }
        data = await ReqMidtransTransaction(params)
        console.log(data)
        form.success(res, data);
    },

    requestMidtranTokenById:async (req, res) => {
        //request midtrans token jika order sudah dibuat tapi belum insert token midtrans ke db

        const {id} = req.params
        const user_id = req.decodedToken.id;
        
        order = await orderModel
        .getOrderById(id, user_id)
        .then((data) => {
            return data
        })
        .catch((error) => {
            return error
        });
        order = JSON.parse(JSON.stringify(order))[0][0];
        params = {
            'transaction_code':order.transaction_code,
            'total':order.total
        }
        dataMidtransCallBack = await ReqMidtransTransaction(params)
        console.log('request callback:',dataMidtransCallBack)
        // jika berhasil request token
        if (dataMidtransCallBack) {
            console.log('statusP :', dataMidtransCallBack.status)
            if (dataMidtransCallBack.status=='200') {

                // insert midtrans token to db
                const user_id = req.decodedToken.id;
                const level = req.decodedToken.level_id;
                let body = {
                    order_id: id,
                    midtrans_token:dataMidtransCallBack.token
                }
                midtrans = await orderModel
                .insertMidtransTrxToken(body, level, user_id)
                .then( async (data) => {
                    form.success(res, dataMidtransCallBack);
                })
                .catch((err) => {
                    form.error(res, err);
                });

                // form.success(res, data);
            } else {
                form.error(res,dataMidtransCallBack)
            }
        } else {
            // form.errorMidtrans(res,data)
            form.error(res,data)
        }
    },

    updateMidtrans: async (req,res)=>{
        const { body } = req
        const user_id = req.decodedToken.id;
        const level = req.decodedToken.level_id;
        midtrans = await orderModel
        .updateMidtransTrxToken(body, level, user_id)
        .then( async (data) => {
            form.success(res, data);
        })
        .catch((err) => {
            form.error(res, err);
          });
    }
}