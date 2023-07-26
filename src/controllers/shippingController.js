// const knex = require('../knex'); // Assuming you have a Knex instance set up
const byteshipAPIService = require('../../services/byteshipAPIService');
const shippingModel = require("../models/shipping");
const form = require("../helpers/form");


module.exports = {
    /**
     * Fetch biteship API area to get area id 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    fetchMapsByTerm: async(req, res) => {
        const term = req.query.input
        if (!term){
            return res.status(400).json({ error: 'area is null or undefined' });
        }
        try {
            // Make a request to the third-party API
            console.log('term',term)
            const data = await byteshipAPIService.fetchMapsByTerm(term);
        
            // Send the data as the API response
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    /**
     * Fetch biteship API couriers rate
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    fetchRatesCouriers: async(req, res) => {
        console.log(req.body)
        console.log(req.body.items[0])
        // area id validation
        if (!req.body.shipper_area_id || !req.body.destination_area_id){
            return res.status(400).json({ error: 'areas is null or undefined' });
        }
        //items validation
        // Required Params : 
        // "items": [{
        //     "value": 199000,
        //     "weight": 200,
        //     "quantity": 2
        //   }]
        if (req.body.items && req.body.items?.some(item => !item.value || !item.weight || !item.quantity)) {
            return res.status(400).json({ error: 'items attribute is required' });
        }
          
        try {
            // Make a request to the third-party API
            const data = await byteshipAPIService.fetchRatesCouriers(req.body);
        
            // Send the data as the API response
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    /**
     * Fetch biteship API shipment data by kode transaksi
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    fetchShipmentByCode: async(req, res) => {
        console.log(req.params)
        transaction_code = req.params.code
        console.log('transaction_code:',transaction_code)
        if (transaction_code) {
            shippingModel
            .fetchShipmentByCode(transaction_code)
            .then(async (data) => {
              form.nestedShippingDataByCode(res, data);
            })
            .catch((err) => {
              form.error(res, err);
            });
        }
        
    },

    /**
     * update tracking number into database
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    insertTrackingNumber: async(req, res) => {
        shippingModel
        .insertTrackingNumber(req.body)
        .then(async (data) => {
            form.success(res, data);
        })
        .catch((err) => {
            console.log('err',err)
            form.error(res, err);
        });
    
        
    },

    /**
     * Fetch tracking data from biteship
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    fetchTrackingData: async(req,res) => {
        console.log(req.query)
        const tracking_number = req.query.tracking_number
        const courier_code = req.query.courier_code
        if (!tracking_number){
            return res.status(400).json({ error: 'area is null or undefined' });
        }
        try {
            // Make a request to the third-party API
            let params = {
                tracking_number:tracking_number,
                courier_code,courier_code
            }
            const data = await byteshipAPIService.fetchTracking(params);
        
            // Send the data as the API response
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    /**
     * check shipping status
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    checkShippingStatus: async(req,res) => {
        console.log(req.query)
        const tracking_number = req.query.tracking_number
        const courier_code = req.query.courier_code
        const order_id = req.query.order_id
        if (!tracking_number){
            return res.status(400).json({ error: 'area is null or undefined' });
        }
        try {
            // Make a request to the third-party API
            let params = {
                tracking_number:tracking_number,
                courier_code,courier_code
            }
            const data = await byteshipAPIService.fetchTracking(params);

            console.log(data.status);
            if (data.status == 'delivered') {
                let params = {
                    order_id:order_id
                }
                shippingModel
                .updateShippingStatus(params)
                .then(async (data) => {
                    // form.success(res, data);
                })
                .catch((err) => {
                    // console.log('err',err)
                    // form.error(res, err);
                });
            }
        
            // Send the data as the API response
            res.json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

};