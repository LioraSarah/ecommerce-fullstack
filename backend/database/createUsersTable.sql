-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE users(
    id SERIAL PRIMARY KEY NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    first_name character varying COLLATE pg_catalog."default" NOT NULL,
    last_name character varying COLLATE pg_catalog."default" NOT NULL,
    verification_token character varying,
    verified boolean,
    cart_id integer,
    CONSTRAINT email UNIQUE (email)
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;