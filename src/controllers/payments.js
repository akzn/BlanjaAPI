const orderModel = require("../models/orders");
const form = require("../helpers/form");
const { ReqMidtransTransaction,getTransactionStatus } = require("../helpers/midtrans");

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
        console.log('id',id)
        if (id == null || id == undefined){
            return res.status(400).json({ error: 'id is null or undefined' });
        }
        
        // order = await orderModel
        // .getOrderById(id, user_id)
        // .then((data) => {
        //     return data
        // })
        // .catch((error) => {
        //     return error
        // });

        try {
            order = await orderModel.getOrderById(id, user_id);
            // return res.status(200).json({ order });
          } catch (error) {
            return res.status(500).json({ error: 'Error fetching order' });
          }
        
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
    },

    updateMidtransByCode: async (req,res)=>{
        const { body } = req
        const user_id = req.decodedToken.id;
        const level = req.decodedToken.level_id;
        midtrans = await orderModel
        .updateMidtransTrxByCode(body, level, user_id)
        .then( async (data) => {
            form.success(res, data);
        })
        .catch((err) => {
            form.error(res, err);
          });
    },

    getTransactionStatusByOrderCode : async (req,res) => {
        // param "id" here is transaction_code on table.orders 
        const {id} = req.params
        const user_id = req.decodedToken.id;
        const level = req.decodedToken.level_id;
        console.log('order_id',id)
        response = await getTransactionStatus(id)
        .then( async (data) => {
            console.log('Midtrans Response',data)

            // Update table if midtrans status found
            if (data.status_code) {
                let channel_info = {};
                let trx_info = {};
                console.log('va_numbers',data.va_numbers)
                if (data.va_numbers) {
                    channel_info = {
                        channel_name:data.va_numbers[0].bank,
                        va_number:data.va_numbers[0].va_number 
                    }
                } else if(data.payment_type==="qris"){
                    channel_info = {
                        channel_name:data.acquirer,
                    }
                }
                trx_info = {
                    transaction_id:data.transaction_id,
                    transaction_status:data.transaction_status,
                    status_code:data.status_code,
                    payment_type:data.payment_type,
                }
                const mergedJson = Object.assign({}, trx_info, channel_info);
                let formData = {
                    'transaction_code' : id,
                    'data' : {
                        ...mergedJson
                    }
                }
                console.log('formData',formData)
                update = await orderModel
                    .updateMidtransTrxByCode(formData, level, user_id)
                    .then( async (data) => {
                        // console.log('update response:',res)
                        console.log('update data:',data)
                    })
                    .catch((err) => {
                        form.error(res, err);
                        // console.log('update response:',res)
                        console.log('update err data:',err)
                      });
            }

            // update order status if payment failed
            if (data.status_code === '407') {
                // expire
                // change order status to canceled
                let formData = {
                    status_order:'canceled'
                    
                }
                orderModel
                .updateStatusOrderByTrxCode(id, formData, level)
                .then((data) => {
                    console.log('Order Update','updated to canceled');
                })
                .catch((err)=> {
                    console.log(err);
                });
            }
            
            form.success(res, data);
        })
        .catch((err) => {
            form.error(res, err);
          });
        // console.log('response',response);

    }

}