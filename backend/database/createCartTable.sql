-- Table: public.cart

-- DROP TABLE IF EXISTS public.cart;

CREATE TABLE cart(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id integer NOT NULL,
    product_id integer NOT NULL,
    quantity integer NOT NULL
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.cart
    OWNER to postgres;