const pool = require('./connection.js');

module.exports = {
    findUserByMail: async (email) => {
        return new Promise((resolve, reject)=>{ 
            try {
                pool.query(
                    `SELECT * FROM public.users WHERE email='${email}'`, (err, result) => {
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
    findUserById: async (id) => {
        return new Promise((resolve, reject)=>{ 
            try {
                pool.query(
                    `SELECT * FROM public.users WHERE id=${id}`, (err, result) => {
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
    createUser: async (user) => {
        return new Promise((resolve, reject)=>{ 
            try {
                pool.query(
                    `INSERT INTO public."users" (id, email, password, first_name, last_name)
                        VALUES (DEFAULT, '${user.email}', '${user.password}', '${user.firstName}', '${user.lastName}');`, (err, result) => {
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
