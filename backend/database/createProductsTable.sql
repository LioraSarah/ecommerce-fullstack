-- Table: public.products

-- DROP TABLE IF EXISTS public.products;

CREATE TABLE products(
    id SERIAL PRIMARY KEY NOT NULL,
    product_name character varying COLLATE pg_catalog."default" NOT NULL,
    price double precision NOT NULL,
    category character varying COLLATE pg_catalog."default" NOT NULL,
    material character varying COLLATE pg_catalog."default" NOT NULL,
    quantity integer NOT NULL,
    image_url character varying COLLATE pg_catalog."default"
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;