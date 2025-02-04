
const db = require("../config/mySQL");

module.exports = {
  getAllOrdersHistory: (level, user_id) => {
    return new Promise((resolve, reject) => {
      const queryString = [
        // "SELECT * FROM orders WHERE user_id =" + user_id,
        `SELECT o.id, o.transaction_code, o.total, o.user_id, ac.address, o.status_order, o.created_at, o.updated_at FROM orders as o 
        INNER JOIN address_customer as ac ON o.id_address = ac.id_address
        WHERE o.user_id =${user_id} ORDER BY o.created_at DESC`,
        "SELECT od.order_id, p.product_name, c.category_name, cd.conditions, st.name, od.product_qty, od.sub_total_item FROM order_details as od INNER JOIN products as p ON od.product_id = p.id INNER JOIN categories as c ON p.category_id = c.id_categories  INNER JOIN conditions as cd ON p.condition_id = cd.id INNER JOIN status_product as st ON p.status_product_id = st.id",
      ];
      db.query(queryString.join(";"), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  },

  getOrderById: (order_id, user_id) => {
    return new Promise((resolve, reject) => {
      const queryString = [
        `SELECT o.id, o.transaction_code, o.total, o.user_id, ac.address, o.status_order, o.created_at, o.updated_at 
        ,m.token as midtrans_token, m.transaction_status, m.status_code, m.transaction_id, m.payment_type, m.channel_name
        FROM orders as o 
        INNER JOIN address_customer as ac ON o.id_address = ac.id_address
        LEFT JOIN midtrans as m on o.id = m.order_id
        WHERE o.id='${order_id}' AND o.user_id ='${user_id}'`,
        `SELECT od.order_id, p.id as product_id, p.product_name, c.category_name, cd.conditions, st.name, od.product_qty, od.sub_total_item, p.product_photo FROM order_details as od INNER JOIN products as p ON od.product_id = p.id INNER JOIN categories as c ON p.category_id = c.id_categories INNER JOIN conditions as cd ON p.condition_id = cd.id INNER JOIN status_product as st ON p.status_product_id = st.id WHERE order_id='${order_id}'`,
      ];
      db.query(queryString.join(";"), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  },

  getOrderByCode: (transaction_code, user_id) => {
    return new Promise((resolve, reject) => {
      const queryString = [
        `SELECT o.id, o.transaction_code, o.total, o.user_id, ac.address, o.status_order, o.created_at, o.updated_at 
        ,m.token as midtrans_token, m.transaction_status, m.status_code
        FROM orders as o 
        INNER JOIN address_customer as ac ON o.id_address = ac.id_address
        LEFT JOIN midtrans as m on o.id = m.order_id
        WHERE o.transaction_code='${transaction_code}' AND o.user_id ='${user_id}'`,
        `SELECT od.order_id, p.id as product_id, p.product_name, c.category_name, cd.conditions, st.name, od.product_qty, od.sub_total_item, p.product_photo FROM order_details as od INNER JOIN products as p ON od.product_id = p.id INNER JOIN categories as c ON p.category_id = c.id_categories INNER JOIN conditions as cd ON p.condition_id = cd.id INNER JOIN status_product as st ON p.status_product_id = st.id INNER JOIN orders AS o ON od.order_id = o.id WHERE o.transaction_code='${transaction_code}'`,
      ];
      db.query(queryString.join(";"), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  },

  getOrderByIdforAdmin: (order_id, user_id) => {
    return new Promise((resolve, reject) => {
      const queryString = [
        `SELECT o.id, o.transaction_code, o.total, o.user_id, ac.address, o.status_order, o.created_at, o.updated_at 
        ,m.token as midtrans_token, m.transaction_status, m.status_code
        FROM orders as o 
        INNER JOIN address_customer as ac ON o.id_address = ac.id_address
        LEFT JOIN midtrans as m on o.id = m.order_id
        WHERE o.id='${order_id}'`,
        `SELECT od.order_id, p.id as product_id, p.product_name, c.category_name, cd.conditions, st.name, od.product_qty, od.sub_total_item, p.product_photo FROM order_details as od INNER JOIN products as p ON od.product_id = p.id INNER JOIN categories as c ON p.category_id = c.id_categories INNER JOIN conditions as cd ON p.condition_id = cd.id INNER JOIN status_product as st ON p.status_product_id = st.id WHERE od.order_id='${order_id}'`,
        `SELECT u.id as user_id, u.full_name, u.email, o.id as order_id FROM users u JOIN orders o ON u.id = o.user_id where o.id='${order_id}'`,
        `SELECT m.order_id, m.token, m.transaction_id, m.transaction_status, m.payment_type, m.channel_name, m.va_number FROM midtrans m JOIN orders o ON m.order_id = o.id where o.id='${order_id}'`,
      ];
      db.query(queryString.join(";"), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  },

  postOrders: (body, level, user_id) => {
    const total = body.item.map((data) => {
      return data.sub_total_item;
    });

    const newTotal = total.reduce((a, b) => {
      return a + b;
    });

    const bodyOrder = {
      transaction_code: body.transaction_code,
      id_address: body.id_address,
      total: newTotal,
      user_id: user_id,
      seller_id: body.seller_id,
      id_store_address: body.id_store_address,
      courier_code: body.courier_code,
      courier_type: body.courier_type,
      courier_price: body.courier_price,
      // level: level
    };

    console.log('bodyOrder',bodyOrder)

    return new Promise((resolve, reject) => {
      if (level !== 1) {
        reject({
          msg: "your level is not match to create orders",
          status: 401,
        });
      } else {
        const queryString = "INSERT INTO orders SET ?";
        db.query(queryString, [bodyOrder], (err, data) => {
          // console.log('anjim ', bodyOrder);
          const queryOrderDetails = "INSERT INTO order_details SET ?";
          const queryDoMinusStock = "UPDATE products set product_qty=product_qty-? where id=?";
          // body.item.map((results) => {
          //   const dataOrderDetail = {
          //     ...results,
          //     order_id: data.insertId,
          //   };
          //   db.query(queryOrderDetails, dataOrderDetail);
          // });
          const excludedKeys = ["weight","value","quantity"]; // Array of keys to exclude

          //
          body.item.forEach((item) => {
            const filteredItem = Object.keys(item)
              .filter((key) => !excludedKeys.includes(key))
              .reduce((obj, key) => {
                obj[key] = item[key];
                return obj;
              }, {});
            
            const dataOrderDetail = {
              ...filteredItem,
              order_id: data.insertId,
            };
            
            db.query(queryOrderDetails, dataOrderDetail);

            const dataDoMinusStock = [item.product_qty,item.product_id]

            db.query(queryDoMinusStock,dataDoMinusStock);
          });
          //
            
          if (!err) {
            data.total = newTotal
            resolve(data);
          } else {
            reject(err);
          }
        });
      }
    });
  },

  getAllOrderHistorySeller: (user_id) => {
    return new Promise((resolve, reject) => {
      const queryString = [
        // "SELECT * FROM orders WHERE user_id =" + user_id,
        `SELECT o.id, o.transaction_code, o.total, o.user_id, ac.address, o.status_order, o.created_at, o.updated_at FROM orders as o 
        INNER JOIN address_customer as ac ON o.id_address = ac.id_address
        WHERE o.seller_id =${user_id}`,
        "SELECT od.order_id, p.product_name, c.category_name, cd.conditions, st.name, od.product_qty, od.sub_total_item, p.product_photo FROM order_details as od INNER JOIN products as p ON od.product_id = p.id INNER JOIN categories as c ON p.category_id = c.id_categories  INNER JOIN conditions as cd ON p.condition_id = cd.id INNER JOIN status_product as st ON p.status_product_id = st.id ",
      ];
      db.query(queryString.join(";"), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  },

  getAllOrderHistoryAdmin: () => {
    return new Promise((resolve, reject) => {
      const queryString = [
        `SELECT o.id, o.transaction_code, o.total, o.user_id, ac.address, o.status_order, o.created_at, o.updated_at FROM orders as o 
        INNER JOIN address_customer as ac ON o.id_address = ac.id_address`,
        "SELECT od.order_id, p.product_name, c.category_name, cd.conditions, st.name, od.product_qty, od.sub_total_item, p.product_photo FROM order_details as od INNER JOIN products as p ON od.product_id = p.id INNER JOIN categories as c ON p.category_id = c.id_categories  INNER JOIN conditions as cd ON p.condition_id = cd.id INNER JOIN status_product as st ON p.status_product_id = st.id ",
      ];
      db.query(queryString.join(";"), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  },

  getOrderHistorySellerById: (order_id, user_id) => {
    return new Promise((resolve, reject) => {
      const queryString = [
        `SELECT o.id, o.transaction_code, o.total, o.user_id, ac.address, o.status_order, o.created_at, o.updated_at FROM orders as o 
        INNER JOIN address_customer as ac ON o.id_address = ac.id_address
        WHERE o.seller_id =${user_id} AND o.id=${order_id}`,
        `SELECT od.order_id, p.product_name, c.category_name, cd.conditions, st.name, od.product_qty, od.sub_total_item, p.product_photo FROM order_details as od 
        INNER JOIN products as p ON od.product_id = p.id 
        INNER JOIN categories as c ON p.category_id = c.id_categories  
        INNER JOIN conditions as cd ON p.condition_id = cd.id 
        INNER JOIN status_product as st ON p.status_product_id = st.id WHERE od.order_id=${order_id}`,
      ];
      db.query(queryString.join(";"), (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          console.log(err);
          reject(err);
        }
      });
    });
  },

  updateStatusOrder: (order_id, body, level) => {
    return new Promise((resolve, reject) => {
      if (level !== 2) {
        reject({
          msg: "your level is not match to create orders",
          status: 401,
        });
      } else {
        const queryString = "UPDATE orders SET ? WHERE id =?";

        db.query(queryString, [body, order_id], (err, data) => {
          if (!err) {
            resolve({
              msg: "Update status is successfully",
              status: 200,
              data: data,
            });
          } else {
            reject({
              msg: "Update status is failed",
              status: 500,
            });
          }
        });
      }
    });
  },

  updateStatusOrderByTrxCode: (transaction_code, body, level) => {
    return new Promise((resolve, reject) => {
        const queryString = "UPDATE orders SET ? WHERE transaction_code =?";

        db.query(queryString, [body, transaction_code], (err, data) => {
          if (!err) {
            resolve({
              msg: "Update status is successfully",
              status: 200,
              data: data,
            });
          } else {
            reject({
              msg: "Update status is failed",
              status: 500,
            });
            console.log('err',err)
          }
        });
      
    });
  },

  insertMidtransTrxToken: (body, level, user_id) => {

    const bodyOrder = {
      order_id: body.order_id,
      token: body.midtrans_token,
    };

    return new Promise((resolve, reject) => {
      if (level !== 1) {
        reject({
          msg: "your level is not match to create orders",
          status: 401,
        });
      } else {
        const queryString = "INSERT INTO midtrans SET ?";
        db.query(queryString, [bodyOrder], (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        });
      }
    });
  },

  updateMidtransTrxToken: (body, level, user_id) => {

    order_id = body.order_id
    dataUpdate = body.data
    console.log(dataUpdate)
    const bodyOrder = {
      ...
      dataUpdate
    };

    return new Promise((resolve, reject) => {
      // if (level !== 1) {
      //   reject({
      //     msg: "your level is not match to create orders",
      //     status: 401,
      //   });
      // } else {
        const queryString = "UPDATE midtrans SET ? where order_id = ?";
        db.query(queryString, [bodyOrder,order_id], (err, data) => {
          if (!err) {
            resolve(data);
          } else {
            reject(err);
          }
        });
      // }
    });
  },


updateMidtransTrxByCode: (body, level, user_id) => {

  transaction_code = body.transaction_code
  dataUpdate = body.data
  console.log('dataUpdate',dataUpdate)
  console.log('transaction_code',transaction_code)
  const bodyOrder = {
    ...
    dataUpdate
  };

  return new Promise((resolve, reject) => {
    // if (level !== 1) {
    //   reject({
    //     msg: "your level is not match to create orders",
    //     status: 401,
    //   });
    // } else {
      const queryString = "UPDATE midtrans JOIN orders ON midtrans.order_id = orders.id SET ? where transaction_code = ?";
      db.query(queryString, [bodyOrder,transaction_code], (err, data) => {
        if (!err) {
          resolve(data);
        } else {
          reject(err);
        }
      });
    // }
  });
},

};
