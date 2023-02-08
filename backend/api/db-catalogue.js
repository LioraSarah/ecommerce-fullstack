const pool = require('./connection.js');

module.exports = {
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
    }
}
