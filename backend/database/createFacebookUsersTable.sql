-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE facebook_users(
    id character varying PRIMARY KEY NOT NULL,
    email character varying NOT NULL,
    first_name character varying NOT NULL,
    last_name character varying NOT NULL,
    cart_id integer
);

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.facebook_users
    OWNER to postgres;