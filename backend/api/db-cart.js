const pool = require('./connection.js');

module.exports = {
    //input: all the nessecary product information to store in cart
    addToCart: async (details) => {
        //we are returning a promise in order to make the operation Asynchronic
        return new Promise((resolve, reject) => {
            console.log(details.productSize);
            pool.query(`INSERT INTO public.cart(id, user_id, product_id, quantity, size)
            VALUES (DEFAULT, '${details.userId}', ${details.productId}, ${details.quantity}, '${details.productSize}');`, (err, result) => {
                if (!err) {
                    return resolve(result);
                } else {
                    return reject(err);
                }
            });

        });
    },
    //input: the user id to search in the cart
    //output: all the cart item of thet user and their details
    getCart: async (userId) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT *
                FROM public.cart
                JOIN public.products 
                ON public.cart.product_id = public.products.id
                WHERE public.cart.user_id = '${userId}'`, (err, result) => {
                if (!err) {
                    return resolve(result.rows);
                } else {
                    return reject(err);
                }
            }
            );
        });
    },
    //input: the user id to search and the specific item id to retrieve
    //output: the specific item and all his details
    getItemInCart: async (id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT *
                FROM public.cart
                WHERE public.cart.id = ${id};`, (err, result) => {
                if (!err) {
                    return resolve(result.rows);
                } else {
                    return reject(err);
                }
            }
            );
        });
    },
    //when a user update the quantity of a specific item in his cart
    updateQuantity: async (id, quantity) => {
        console.log("update quantity");
        console.log(quantity);
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE public.cart 
                SET quantity = ${quantity}
                WHERE public.cart.id = ${id};`, (err, result) => {
                if (!err) {
                    return resolve(result.rows);
                } else {
                    return reject(err);
                }
            }
            );
        });
    },
    //input: an object containing the user id and product id to remove
    deleteItem: async (id) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `DELETE FROM cart
                WHERE public.cart.id = ${id};`, (err, result) => {
                if (!err) {
                    return resolve(result);
                } else {
                    return reject(err);
                }
            }
            );
        });
    }
}
