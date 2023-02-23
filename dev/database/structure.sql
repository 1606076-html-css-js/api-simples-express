
CREATE TABLE public.livros (
	id bigint NOT NULL GENERATED ALWAYS AS IDENTITY,
	title varchar NOT NULL,
	description varchar NULL,
	CONSTRAINT livros_pk PRIMARY KEY (id)
);