const pool = require('./connection.js');

module.exports = {
    addToCart: async (details) => {
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
    getItemInCart: async (userId, productId) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT *
                FROM public.cart
                WHERE public.cart.user_id = '${userId}' 
                AND public.cart.product_id = ${productId};`, (err, result) => {
                if (!err) {
                    console.log("cart item in db");
                    console.log(result.rows)
                    return resolve(result.rows);
                } else {
                    return reject(err);
                }
            }
            );
        });
    },
    updateQuantity: async (userId, productId, quantity) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE public.cart 
                SET quantity = ${quantity}
                WHERE public.cart.user_id = '${userId}' 
                AND public.cart.product_id = ${productId};`, (err, result) => {
                if (!err) {
                    return resolve(result.rows);
                } else {
                    return reject(err);
                }
            }
            );
        });
    },
    deleteItem: async (itemInfo) => {
        return new Promise((resolve, reject) => {
            pool.query(
                `DELETE FROM cart
            WHERE user_id = '${itemInfo.userId}' AND product_id = ${itemInfo.productId};`, (err, result) => {
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
