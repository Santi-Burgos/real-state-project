CREATE TABLE IF NOT EXISTS appointments_status(
  status_appointment_id SERIAL PRIMARY KEY,
  appointments_status VARCHAR(50) UNIQUE
);

CREATE TABLE IF NOT EXISTS appointments(
  appointments_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id UUID,
  customer_id UUID, 
  user_id UUID, 
  status_appointment_id INT, 
  appointments_date DATE, 
  appointments_start_at TIME,
  created_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_property FOREIGN KEY (property_id)
  REFERENCES property(property_id) ON DELETE SET NULL,

  CONSTRAINT fk_customer FOREIGN KEY (customer_id)
  REFERENCES customer(customer_id) ON DELETE SET NULL,

  CONSTRAINT fk_status_appointment FOREIGN KEY (status_appointment_id)
  REFERENCES appointments_status(status_appointment_id) ON DELETE SET NULL,

  CONSTRAINT fk_user FOREIGN KEY(user_id)
  REFERENCES users(user_id) ON DELETE SET NULL
);