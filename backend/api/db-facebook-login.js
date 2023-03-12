const pool = require('./connection.js');

module.exports = {
    findUserByFacebookId: async (id) => {
        return new Promise((resolve, reject)=>{ 
            try {
                pool.query(
                    `SELECT * FROM public.facebook_users WHERE id='${id}'`, (err, result) => {
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
    createFacebookUser: async (user) => {
        return new Promise((resolve, reject)=>{ 
            try {
                pool.query(
                    `INSERT INTO public."facebook_users" (id, email, first_name, last_name, user_type)
                        VALUES ('${(user.id)}', '${user.email}', '${user.first_name}', '${user.last_name}', '${user.userType}');`, (err, result) => {
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
