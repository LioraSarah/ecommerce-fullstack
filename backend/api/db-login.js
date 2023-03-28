const pool = require('./connection.js');

module.exports = {
    findUserByMail: async (email) => {
        return new Promise((resolve, reject)=>{ 
            try {
                pool.query(
                    `SELECT * FROM public.users WHERE email='${email}';`, (err, result) => {
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
                    `SELECT * FROM public.users WHERE id=${id};`, (err, result) => {
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
                    `INSERT INTO public."users" (id, email, password, first_name, last_name, user_type, verification_token, verified)
                        VALUES (DEFAULT, '${user.email}', '${user.password}', '${user.firstName}', '${user.lastName}', '${user.userType}', '${user.verification_token}', ${user.verified});`, (err, result) => {
                    if (!err) {
                        console.log("user is created in db");
                         return resolve(result);
                    } else {
                        return reject(err);
                    }
                });
                
            } catch (err) {
                return reject(err);
            }    
        });
    },
    //When the user verified his email after registration: 
    //set him to verified and return his details for further actions
    setVerified: async (userId) => {
        return new Promise((resolve, reject)=>{ 
            try {
                pool.query(
                    `UPDATE users
                    SET verified = true
                    WHERE id = ${userId}
                    RETURNING *;`, (err, result) => {
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
    }
}
