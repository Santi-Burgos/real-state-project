CREATE TABLE IF NOT EXISTS providers_service(
  providers_service_id SERIAL PRIMARY KEY,
  providers_service VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS providers(
  provider_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(50),
  phone VARCHAR(25),
  provider_name VARCHAR(25),
  providers_service_id INT,
  CONSTRAINT fk_provider_service_id FOREIGN KEY(providers_service_id)
  REFERENCES providers_service(providers_service_id) ON DELETE CASCADE
);