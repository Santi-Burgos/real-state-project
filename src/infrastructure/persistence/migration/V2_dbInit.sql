CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE TABLE IF NOT EXISTS property_status (
    property_status_id SERIAL PRIMARY KEY,
    status_name VARCHAR(25) NOT NULL
);
CREATE TABLE IF NOT EXISTS property_type(
  property_type_id SERIAL KEY NOT NULL UNIQUE,
  property_type VARCHAR(25)
);
CREATE TABLE IF NOT EXISTS property_service(
  property_service_id SERIAL KEY NOT NULL UNIQUE,
  property_price VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS property(
  property_id UUID PRIMARY KEY NOT NULL UNIQUE,
  property_address VARCHAR(50),
  CONSTRAINT fk_status FOREIGN KEY (property_status_id) 
    REFERENCES property_status(property_status_id),
  CONSTRAINT fk_services FOREIGN KEY {property_service_id}  
    REFERENCES property_service(property_service_id)
  CONSTRAINT fk_type FOREIGN KEY {property_type_id}  
    REFERENCES property_type(property_type_id)
)

CREATE TABLE IF NOT EXISTS property_price(
  property_price_id SERIAL PRIMARY KEY NOT NULL UNIQUE,
  property_price DECIMAL(12, 2) NOT NULL,
  CONSTRAINT fk_property FOREIGN KEY {property_id}  
    REFERENCES property(property_id)
)

CREATE TABLE IF NOT EXISTS detail(
  detail_id SERIAL KEY NOT NULL UNIQUE,
  bath_quantity SMALLINT,
  room_quantity SMALLINT,
  electricity_service BOOLEAN,
  water_service BOOLEAN,
  internet_service BOOLEAN,
  CONSTRAINT fk_property FOREIGN KEY (property_id)  
    REFERENCES property(property_id)
)

CREATE TABLE IF NOT EXISTS property_image(
  detail_id SERIAL KEY NOT NULL UNIQUE,
  bath_quantity SMALLINT,
  room_quantity SMALLINT,
  electricity_service BOOLEAN,
  water_service BOOLEAN,
  internet_service BOOLEAN,
  CONSTRAINT fk_property FOREIGN KEY (property_id)  
    REFERENCES property(property_id)
)

