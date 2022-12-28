const form = require("./form");

// const midtransClient = require('./../../index.js');
const midtransClient = require('midtrans-client'); // use this if installed via NPM
// const { request } = require("express");

// This is just for very basic implementation reference, in production, you should validate the incoming requests and implement your backend more securely.
// Please refer to this docs for snap popup:
// https://docs.midtrans.com/en/snap/integration-guide?id=integration-steps-overview

// Please refer to this docs for snap-redirect:
// https://docs.midtrans.com/en/snap/integration-guide?id=alternative-way-to-display-snap-payment-page-via-redirect

// Initialize api client object
// You can find it in Merchant Portal -> Settings -> Access keys
let snap = new midtransClient.Snap({
    isProduction : false,
    serverKey : process.env.MIDTRANS_SERVERKEY,
    clientKey : process.env.MIDTRANS_CLIENTKEY
});

module.exports = {
    ReqMidtransTransaction: async (requests, response) => {

        // prepare Snap API parameter ( refer to: https://snap-docs.midtrans.com ) minimum parameter example:
        let parameter = {
            "transaction_details": {
                "order_id": requests.transaction_code,
                "gross_amount": requests.total
            }, "credit_card":{
                "secure" : true
            }
        };

        // create transaction
        response = await snap.createTransaction(parameter)
        .then((transaction)=>{
            // transaction token
            let transactionToken = transaction.token;
            // console.log('transactionToken:',transactionToken);

            // transaction redirect url
            let transactionRedirectUrl = transaction.redirect_url;
            // console.log('transactionRedirectUrl:',transactionRedirectUrl);

            data = {
                'token': transactionToken,
                'redirectUrl': transactionRedirectUrl,
            }

            console.log('Midtrans:',data);

            ret = {
                status:'200',
                ...data
            }
            return ret
        })
        .catch((e)=>{
            // console.log('Error occured:',e);
            console.log('Error occured:',e.message);
            // form.errorMidtrans(response,e);

            ret = {
                status:e.httpStatusCode,
                message:e.message
            }
            return ret
        });

        // transaction is object representation of API JSON response
        // sample:
        // {
        // 'redirect_url': 'https://app.sandbox.midtrans.com/snap/v2/vtweb/f0a2cbe7-dfb7-4114-88b9-1ecd89e90121', 
        // 'token': 'f0a2cbe7-dfb7-4114-88b9-1ecd89e90121'
        // }
        
        return response
    }
}