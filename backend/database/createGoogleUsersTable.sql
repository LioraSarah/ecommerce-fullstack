-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE google_users(
    id character varying COLLATE pg_catalog."default" PRIMARY KEY NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    first_name character varying COLLATE pg_catalog."default" NOT NULL,
    last_name character varying COLLATE pg_catalog."default" NOT NULL,
    cart_id integer
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.google_users
    OWNER to postgres;