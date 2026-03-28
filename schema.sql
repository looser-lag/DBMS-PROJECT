-- Campus Skill Exchange System - DDL Schema
-- 

-- 1. USER Entity
CREATE TABLE "USER" (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    reputation_score DECIMAL(3, 2) DEFAULT 0.00
);

-- 2. USER_PHONE Entity
CREATE TABLE USER_PHONE (
    user_id INT NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    PRIMARY KEY (user_id, phone_number),
    FOREIGN KEY (user_id) REFERENCES "USER"(user_id) ON DELETE CASCADE
);

-- 3. CATEGORY Entity
CREATE TABLE CATEGORY (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

-- 4. SKILL Entity
CREATE TABLE SKILL (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL,
    category_id INT NOT NULL,
    description TEXT,
    FOREIGN KEY (category_id) REFERENCES CATEGORY(category_id) ON DELETE CASCADE
);

-- 5. USER_SKILL Entity
CREATE TABLE USER_SKILL (
    user_id INT NOT NULL,
    skill_id INT NOT NULL,
    experience_level VARCHAR(50), -- e.g., 'Beginner', 'Intermediate', 'Expert'
    hourly_rate DECIMAL(10, 2) NOT NULL,
    availability_status BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES "USER"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES SKILL(skill_id) ON DELETE CASCADE
);

-- 6. SERVICE_REQUEST Entity
CREATE TABLE SERVICE_REQUEST (
    request_id SERIAL PRIMARY KEY,
    requester_id INT NOT NULL,
    skill_id INT NOT NULL,
    description TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Assigned', 'Completed', 'Cancelled'
    FOREIGN KEY (requester_id) REFERENCES "USER"(user_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES SKILL(skill_id) ON DELETE CASCADE
);

-- 7. SERVICE_ASSIGNMENT Entity
CREATE TABLE SERVICE_ASSIGNMENT (
    assignment_id SERIAL PRIMARY KEY,
    request_id INT UNIQUE NOT NULL, -- 1:1 Relationship with Request
    provider_id INT NOT NULL,
    assigned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completion_date TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Accepted', -- 'Accepted', 'Declined', 'Completed'
    FOREIGN KEY (request_id) REFERENCES SERVICE_REQUEST(request_id) ON DELETE CASCADE,
    FOREIGN KEY (provider_id) REFERENCES "USER"(user_id) ON DELETE CASCADE
);

-- 8. FEEDBACK Entity
CREATE TABLE FEEDBACK (
    assignment_id INT PRIMARY KEY, -- 1:1 Relationship with Assignment
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comments TEXT,
    feedback_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assignment_id) REFERENCES SERVICE_ASSIGNMENT(assignment_id) ON DELETE CASCADE
);
