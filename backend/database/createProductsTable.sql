-- Table: public.products

-- DROP TABLE IF EXISTS public.products;

CREATE TABLE IF NOT EXISTS public.products
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    product_name character varying COLLATE pg_catalog."default" NOT NULL,
    price double precision NOT NULL,
    category character varying COLLATE pg_catalog."default" NOT NULL,
    material character varying COLLATE pg_catalog."default" NOT NULL,
    quantity integer NOT NULL,
    image_url character varying COLLATE pg_catalog."default",
    CONSTRAINT products_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;