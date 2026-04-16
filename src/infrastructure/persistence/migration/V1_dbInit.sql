CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS roles(
  rol_id SERIAL PRIMARY KEY,
  rol_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS user(
  user_id UUID PRIMARY KEY,
  email VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  username VARCHAR (50),
  rol_id SERIAL,
  CONSTRAINT fk_users_rol FOREIGN KEY (rol_id)
  REFERENCES roles(rol_id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS permissions(
  permissions_id SERIAL PRIMARY KEY, 
  permission VARCHAR(75) NOT NULL UNIQUE,
);

CREATE TABLE IF NOT EXISTS role_permissions(
  rol_id SERIAL,
  permissions_id SERIAL,
  CONSTRAINT pk_role_permission PRIMARY KEY (rol_id, permission_id),

  CONSTRAINT fk_role_permission_roles FOREIGN KEY (rol_id) 
  REFERENCES roles(rol_id) ON DELETE CASCADE,

  CONSTRAINT fk_role_permission_permission FOREIGN KEY (permission_id) 
  REFERENCES permission(permission_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS customer_type(
  customer_type_id SERIAL PRIMARY KEY,
  customer_type VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS customer(
  customer_id UUID PRIMARY KEY NOT NULL UNIQUE,
  email VARCHAR(50),
  phone INTEGER(50),
  customer_name VARCHAR(50),
  customer_public_id VARCHAR(50),
  customer_type_id SERIAL,
  CONSTRAINT fk_customer_type FOREIGN KEY (customer_type_id)
  REFERENCES customer_type_id ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ticket_type(
  ticket_type_id SERIAL PRIMARY KEY NOT NULL,
  ticket_type VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS ticket_status(
  ticket_status_id SERIAL PRIMARY KEY NOT NULL,
  ticket_status VARCHAR(25), 
);

CREATE TABLE IF NOT EXISTS tickets(
  ticket_id UUID PRIMARY KEY NOT NULL, 
  ticket_description VARCHAR(255) NOT NULL,
  created_at DATE DEFAULT NOW(),
  ticket_status_id SERIAL,
  ticket_type_id SERIAL,
  customer_id UUID,
  CONSTRAINT fk_ticket_status FOREIGN KEY (ticket_status_id)
  REFERENCES ticket_status(ticket_status_id) ON DELETE SET NULL,

  CONSTRAINT fk_ticket_type FOREIGN KEY (ticket_type_id)
  REFERENCES ticket_type(ticket_type_id) ON DELETE SET NULL,

  CONSTRAINT fk_customer_key FOREIGN KEY (customer_id)
  REFERENCES customer(customer_id) ON DELETE CASCADE
);