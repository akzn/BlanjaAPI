const db = require("../config/mySQL");

module.exports = {
    fetchShipmentByCode: (transaction_code) => {
        return new Promise((resolve, reject) => {
          const queryString = [
            `SELECT * from orders where transaction_code='${transaction_code}'`,
            `SELECT * from address_customer ca join orders o on o.id_address = ca.id_address where o.transaction_code='${transaction_code}'`,
          ];
          db.query(queryString.join(";"), (err, data) => {
            if (!err) {
                console.log(data);
              resolve(data);
            } else {
              console.log(err);
              reject(err);
            }
          });
        });
      },
    
    insertTrackingNumber : (body) => {
        order_id = body.order_id
        body = {
            shipping_status : 'on delivery',
            courier_tracking_number : body.tracking_number,
        }
        return new Promise((resolve, reject) => {
          const queryString = [
            `UPDATE orders set shipping_status='${body.shipping_status}',courier_tracking_number='${body.courier_tracking_number}' where id='${order_id}'`,
          ];
          db.query(queryString.join(";"), (err, data) => {
            console.log(queryString)
            if (!err) {
                console.log(data);
              resolve(data);
            } else {
              console.log(err);
              reject(err);
            }
          });
        });
    },

    updateShippingStatus: (body) => {
        order_id = body.order_id
        body = {
            shipping_status : 'delivered',
        }
        return new Promise((resolve, reject) => {
          const queryString = [
            `UPDATE orders set shipping_status='${body.shipping_status}' where id='${order_id}'`,
          ];
          db.query(queryString.join(";"), (err, data) => {
            console.log(queryString)
            if (!err) {
                console.log(data);
              resolve(data);
            } else {
              console.log(err);
              reject(err);
            }
          });
        });
    },
}