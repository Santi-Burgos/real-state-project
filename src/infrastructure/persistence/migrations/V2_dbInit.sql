CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS property_status (
    property_status_id SERIAL PRIMARY KEY,
    status_name VARCHAR(25) NOT NULL
);

CREATE TABLE IF NOT EXISTS property_type(
  property_type_id SERIAL PRIMARY KEY,
  property_type VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS property_service(
  property_service_id SERIAL PRIMARY KEY,
  service_name VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS property(
  property_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_address VARCHAR(50),

  property_status_id INT,
  property_service_id INT,
  property_type_id INT,

  CONSTRAINT fk_status FOREIGN KEY (property_status_id) 
    REFERENCES property_status(property_status_id),

  CONSTRAINT fk_services FOREIGN KEY (property_service_id)  
    REFERENCES property_service(property_service_id),

  CONSTRAINT fk_type FOREIGN KEY (property_type_id)  
    REFERENCES property_type(property_type_id)
);

CREATE TABLE IF NOT EXISTS property_price(
  property_price_id SERIAL PRIMARY KEY,
  property_price DECIMAL(12, 2) NOT NULL,
  property_id UUID,

  CONSTRAINT fk_property FOREIGN KEY (property_id)  
    REFERENCES property(property_id)
);

CREATE TABLE IF NOT EXISTS detail(
  detail_id SERIAL PRIMARY KEY,
  bath_quantity SMALLINT,
  room_quantity SMALLINT,
  electricity_service BOOLEAN,
  water_service BOOLEAN,
  internet_service BOOLEAN,
  property_id UUID,

  CONSTRAINT fk_detail_property FOREIGN KEY (property_id)  
    REFERENCES property(property_id)
);

CREATE TABLE IF NOT EXISTS property_image(
  image_id SERIAL PRIMARY KEY,
  image_url TEXT,
  property_id UUID,

  CONSTRAINT fk_image_property FOREIGN KEY (property_id)  
    REFERENCES property(property_id)
);