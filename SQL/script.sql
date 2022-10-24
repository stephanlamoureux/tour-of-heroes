DROP DATABASE heroes;

CREATE DATABASE heroes;

DROP TABLE heroes;

CREATE TABLE heroes (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(30),
	PRIMARY KEY(id)
);

INSERT INTO heroes(name) VALUES("Dr. Nice");
