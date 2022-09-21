CREATE TABLE public."role" (
	id serial4 NOT NULL,
	"name" text NOT NULL,
	"key" int4 NOT NULL,
	CONSTRAINT role_pkey PRIMARY KEY (id)
);

CREATE TABLE public.users_new (
	id text NOT NULL,
	"name" text NOT NULL,
	address text NULL,
	website text NULL,
	role_id int4 NULL,
	CONSTRAINT users_new_pkey PRIMARY KEY (id)
);
