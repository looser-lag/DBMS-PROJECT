-- Campus Skill Exchange System - DML Seed Data
-- Mock Data for Database Population

-- 1. Insert Categories
INSERT INTO CATEGORY (category_name, description) VALUES 
('Tutoring', 'Academic help related to coursework and assignments'),
('Resume Help', 'Assistance with resume building and review'),
('Coding Help', 'Programming and software development assistance'),
('Design Help', 'UI/UX design, graphic design, and video editing'),
('Mini Freelance', 'Other miscellaneous freelance services');

-- 2. Insert Skills
INSERT INTO SKILL (skill_name, category_id, description) VALUES
('Calculus Tutoring', 1, 'Help with Math 101/Calculus 1'),
('Physics Tutoring', 1, 'Help with Physics 101'),
('Resume Review', 2, 'General resume review and feedback'),
('LinkedIn Optimization', 2, 'Tips for improving LinkedIn profiles'),
('Python Programming', 3, 'Help with Python syntax and logic'),
('Web Development (React)', 3, 'Help with frontend React projects'),
('Figma Design', 4, 'UI/UX prototyping using Figma'),
('Logo Design', 4, 'Creating simple logos for clubs/projects'),
('Photography', 5, 'Taking headshots or event photos');

-- 3. Insert Users
INSERT INTO "USER" (name, email, department, year, reputation_score) VALUES
('Alice Smith', 'alice.smith@university.edu', 'Computer Science', 3, 4.8),
('Bob Johnson', 'bob.johnson@university.edu', 'Engineering', 2, 4.5),
('Charlie Brown', 'charlie.b@university.edu', 'Design', 4, 4.9),
('Diana Prince', 'diana.p@university.edu', 'Business', 1, 0.0), -- New user
('Evan Wright', 'evan.w@university.edu', 'Computer Science', 4, 5.0);

-- 4. Insert User Phones
INSERT INTO USER_PHONE (user_id, phone_number) VALUES
(1, '555-0101'),
(1, '555-0102'),
(2, '555-0201'),
(3, '555-0301'),
(4, '555-0401'),
(5, '555-0501');

-- 5. Insert User Skills (Providers)
INSERT INTO USER_SKILL (user_id, skill_id, experience_level, hourly_rate, availability_status) VALUES
(1, 5, 'Expert', 15.00, TRUE), -- Alice knows Python
(1, 6, 'Intermediate', 20.00, TRUE), -- Alice knows React
(2, 1, 'Expert', 12.50, TRUE), -- Bob tutors Calculus
(2, 2, 'Intermediate', 15.00, FALSE), -- Bob tutors Physics (currently unavailable)
(3, 7, 'Expert', 25.00, TRUE), -- Charlie does Figma
(3, 8, 'Expert', 30.00, TRUE), -- Charlie does Logos
(5, 5, 'Expert', 18.00, TRUE), -- Evan also knows Python
(5, 3, 'Intermediate', 10.00, TRUE); -- Evan does Resume review

-- 6. Insert Service Requests
INSERT INTO SERVICE_REQUEST (requester_id, skill_id, description, preferred_date, status) VALUES
(4, 5, 'Need help debugging a Python loop assignment.', CURRENT_DATE + INTERVAL '2 days', 'Assigned'),
(2, 7, 'Need a basic wireframe for my engineering project app.', CURRENT_DATE + INTERVAL '5 days', 'Pending'),
(4, 3, 'Looking for someone to review my resume for a summer internship.', CURRENT_DATE + INTERVAL '1 day', 'Completed'),
(1, 8, 'Need a quick logo for a CS club hackathon.', CURRENT_DATE + INTERVAL '7 days', 'Pending');

-- 7. Insert Service Assignments
INSERT INTO SERVICE_ASSIGNMENT (request_id, provider_id, assigned_date, completion_date) VALUES
(1, 1, CURRENT_TIMESTAMP - INTERVAL '1 day', NULL), -- Request 1 (Python) assigned to Alice
(3, 5, CURRENT_TIMESTAMP - INTERVAL '3 days', CURRENT_TIMESTAMP - INTERVAL '1 day'); -- Request 3 (Resume) assigned to Evan and completed

-- 8. Insert Feedback
INSERT INTO FEEDBACK (assignment_id, rating, comments, feedback_date) VALUES
(1, 5, 'Evan was incredibly helpful. My resume looks much better now!', CURRENT_TIMESTAMP);
