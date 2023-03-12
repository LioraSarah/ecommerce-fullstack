const pool = require('./connection.js');

module.exports = {
    findUserByGoogleId: async (id) => {
        return new Promise((resolve, reject)=>{ 
            try {
                pool.query(
                    `SELECT * FROM public.google_users WHERE id='${id}'`, (err, result) => {
                    if (!err) {
                         return resolve(result.rows[0]);
                    } else {
                        return reject(err);
                    }
                });
                
            } catch (err) {
                return reject(err);
            }    
        });
    },
    createGoogleUser: async (user) => {
        return new Promise((resolve, reject)=>{ 
            try {
                pool.query(
                    `INSERT INTO public."google_users" (id, email, first_name, last_name, user_type)
                        VALUES (${Number(user.id)}, '${user.email}', '${user.firstName}', '${user.lastName}', '${user.userType}');`, (err, result) => {
                    if (!err) {
                         return resolve("Your register was successful!");
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
