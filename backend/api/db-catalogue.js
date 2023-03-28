const pool = require('./connection.js');

module.exports = {
    //get all items of a specific category from the products table in database
    getCategory: async (category) => {
        return new Promise((resolve, reject)=>{ 
            try {
                pool.query(
                    `SELECT * FROM public.products WHERE category='${category}'`, (err, result) => {
                    if (!err) {
                        return resolve(result.rows);
                    } else {
                        return reject(err);
                    }
                });
                
            } catch (err) {
                return reject(err);
            }    
        });
    },
    //get a specific item from the products table in database
    getItem: async (itemId) => {
        return new Promise((resolve, reject)=>{ 
            try {
                pool.query(
                    `SELECT * FROM public.products WHERE id='${itemId}'`, (err, result) => {
                    if (!err) {
                        return resolve(result.rows);
                    } else {
                        return reject(err);
                    }
                });
                
            } catch (err) {
                return reject(err);
            }    
        });
    }
}
