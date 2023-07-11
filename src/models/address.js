const db = require("../config/mySQL");

module.exports = {
    addAddress: (req, user_id) => {
        return new Promise((resolve, reject) => {
            const qs = "INSERT INTO address_customer SET ?"
            db.query(qs, [req, user_id], (err, data) => {
                if (!err) {
                    resolve(data);
                } else{
                    reject(err);
                }
            })
        })
    },

    getAddressByUser: (user_id) => {
        return new Promise((resolve, reject) => {
          const queryString = `
            SELECT
              a.biteship_address_id, a.id_address, a.fullname, a.phone, a.address, a.city, a.region, a.zip_code, a.country, u.id, a.is_active, a.is_primary
            FROM
              address_customer AS a
            JOIN
              users AS u ON u.id = a.id_user
            WHERE
              a.id_user = ?
            ORDER BY
              a.id_address DESC;
          `;
      
          db.query(queryString, user_id, (err, data) => {
            if (err) {
              reject(err);
              return;
            }
      
            resolve(data);
          });
        });
      },
      

    getAddressStore: (user_id) => {
        return new Promise((resolve, reject) => {
          const queryString = `
            SELECT
              a.biteship_address_id, a.id_address, a.fullname, a.phone, a.address, a.city, a.region,
              a.zip_code, a.country, u.id, a.is_active, a.is_primary
            FROM
              address_customer AS a
            JOIN
              users AS u ON u.id = a.id_user
            WHERE
              u.level_id = 2 AND a.is_primary = '1' AND a.is_active = '1'
            ORDER BY
              a.id_address DESC
            LIMIT 1;
          `;
      
          db.query(queryString, user_id, (err, data) => {
            if (!err) {
              resolve(data);
            } else {
              reject(err);
            }
          });
        });
    },
      

    updateAddress: (req, id, user_id) => {
        return new Promise((resolve, reject) => {
            const queryString = "UPDATE address_customer SET ? WHERE id_address = " + id
            db.query(queryString, [req, user_id], (err, data) => {
                if(!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },

    deleteAddress: (params, user_id) => {
        return new Promise((resolve, reject) => {
            const queryString = "DELETE FROM address_customer WHERE id_address = ?"
            db.query(queryString, [params, user_id], (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    },

    setPrimaryAddress: (id, user_id) => {
        console.log('id',id)
        console.log('user_id',user_id)
        return new Promise((resolve, reject) => {
            const queryString = [
                `UPDATE address_customer set is_primary = '0' WHERE id_user=${user_id}`,
                `UPDATE address_customer SET is_primary = '1' WHERE id_address=${id}`,
              ];
            db.query(queryString.join(";"), [id, user_id], (err, data) => {
                if(!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            });
        });
    },

    setAddressInactive: (params, user_id) => {
        return new Promise((resolve, reject) => {
            const queryString = "UPDATE address_customer set is_active='0' WHERE id_address = ?"
            db.query(queryString, [params, user_id], (err, data) => {
                if (!err) {
                    resolve(data)
                } else {
                    reject(err)
                }
            })
        })
    },
    
}
