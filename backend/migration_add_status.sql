ALTER TABLE SERVICE_ASSIGNMENT ADD COLUMN status VARCHAR(50) DEFAULT 'Accepted';
UPDATE SERVICE_ASSIGNMENT SET status = 'Accepted'; -- Set existing ones to accepted
