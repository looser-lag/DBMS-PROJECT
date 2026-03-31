-- ==========================================
-- CAMPUS SKILL EXCHANGE: DATA WAREHOUSE
-- Star Schema for OLAP (Online Analytical Processing)
-- ==========================================

-- 1. Date Dimension (D_DATE)
CREATE TABLE IF NOT EXISTS D_DATE (
    date_key INT PRIMARY KEY,
    full_date DATE NOT NULL,
    year INT NOT NULL,
    month INT NOT NULL,
    day INT NOT NULL,
    day_name VARCHAR(15) NOT NULL,
    month_name VARCHAR(15) NOT NULL,
    is_weekend BOOLEAN NOT NULL
);

-- 2. User Dimension (D_USER)
CREATE TABLE IF NOT EXISTS D_USER (
    user_key SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    department VARCHAR(50),
    year INT,
    role VARCHAR(20)
);

-- 3. Skill Dimension (D_SKILL)
CREATE TABLE IF NOT EXISTS D_SKILL (
    skill_key SERIAL PRIMARY KEY,
    skill_id INT NOT NULL,
    skill_name VARCHAR(100) NOT NULL,
    category_name VARCHAR(100) NOT NULL
);

-- 4. Fact Table: Service Completions (F_SERVICE_COMPLETIONS)
CREATE TABLE IF NOT EXISTS F_SERVICE_COMPLETIONS (
    completion_id SERIAL PRIMARY KEY,
    assignment_id INT NOT NULL,
    provider_key INT NOT NULL,
    requester_key INT NOT NULL,
    skill_key INT NOT NULL,
    completion_date_key INT NOT NULL,
    rating INT,
    FOREIGN KEY (provider_key) REFERENCES D_USER(user_key),
    FOREIGN KEY (requester_key) REFERENCES D_USER(user_key),
    FOREIGN KEY (skill_key) REFERENCES D_SKILL(skill_key),
    FOREIGN KEY (completion_date_key) REFERENCES D_DATE(date_key)
);

-- ==========================================
-- BUSINESS INTELLIGENCE STORED VIEWS
-- You can query these directly in PostgreSQL
-- e.g., SELECT * FROM BI_Department_Performance;
-- ==========================================

-- View 1: Performance by Department
CREATE OR REPLACE VIEW BI_Department_Performance AS
SELECT 
    d.department, 
    COUNT(f.completion_id) as total_completed_jobs, 
    CAST(AVG(f.rating) AS DECIMAL(10,2)) as avg_rating 
FROM F_SERVICE_COMPLETIONS f 
JOIN D_USER d ON f.provider_key = d.user_key 
GROUP BY d.department 
ORDER BY total_completed_jobs DESC, avg_rating DESC;

-- View 2: Popular Skill Categories
CREATE OR REPLACE VIEW BI_Popular_Categories AS
SELECT 
    s.category_name, 
    COUNT(f.completion_id) as total_jobs
FROM F_SERVICE_COMPLETIONS f
JOIN D_SKILL s ON f.skill_key = s.skill_key
GROUP BY s.category_name
ORDER BY total_jobs DESC;

-- View 3: Weekday vs Weekend Activity
CREATE OR REPLACE VIEW BI_Activity_By_Day_Type AS
SELECT 
    CASE WHEN dt.is_weekend THEN 'Weekend (Sat/Sun)' ELSE 'Weekday (Mon-Fri)' END as time_of_week,
    COUNT(f.completion_id) as jobs_completed
FROM F_SERVICE_COMPLETIONS f
JOIN D_DATE dt ON f.completion_date_key = dt.date_key
GROUP BY time_of_week
ORDER BY jobs_completed DESC;

-- View 4: Top Performing Providers
CREATE OR REPLACE VIEW BI_Top_Providers AS
SELECT 
    d.name as provider_name,
    d.department,
    COUNT(f.completion_id) as total_jobs_done,
    CAST(AVG(f.rating) AS DECIMAL(10,2)) as avg_rating
FROM F_SERVICE_COMPLETIONS f
JOIN D_USER d ON f.provider_key = d.user_key
GROUP BY provider_name, d.department
HAVING COUNT(f.completion_id) > 0
ORDER BY total_jobs_done DESC, avg_rating DESC;
