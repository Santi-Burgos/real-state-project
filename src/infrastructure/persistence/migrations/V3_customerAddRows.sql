CREATE TABLE IF NOT EXISTS status_payments(
  status_payments_id SERIAL PRIMARY KEY,
  status_payments_name VARCHAR(50) NOT NULL UNIQUE
);

ALTER TABLE customer
  ADD COLUMN status_payment_id INT NULL,
  ADD CONSTRAINT fk_customer_status_payment 
    FOREIGN KEY (status_payment_id) 
    REFERENCES status_payments (status_payments_id)
    ON DELETE SET NULL;