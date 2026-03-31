-- Campus Skill Exchange System - DML Seed Data
-- Mock Data for Database Population (Expanded)

-- 1. Insert Categories
INSERT INTO CATEGORY (category_name, description) VALUES 
('Tutoring', 'Academic help related to coursework and assignments'),
('Resume Help', 'Assistance with resume building and review'),
('Coding Help', 'Programming and software development assistance'),
('Design Help', 'UI/UX design, graphic design, and video editing'),
('Mini Freelance', 'Other miscellaneous freelance services'),
('Writing & Editing', 'Help with essays, articles, and proofreading'),
('Language Practice', 'Conversational practice for various languages'),
('Music Lessons', 'Instrumental and vocal coaching'),
('Fitness Training', 'Personal training and workout planning'),
('Tech Support', 'Computer troubleshooting and software setup');

-- 2. Insert Skills
INSERT INTO SKILL (skill_name, category_id, description) VALUES
('Calculus Tutoring', 1, 'Help with Math 101/Calculus 1'),
('Physics Tutoring', 1, 'Help with Physics 101'),
('Chemistry Tutoring', 1, 'Help with Intro Chemistry'),
('Biology Tutoring', 1, 'Help with Intro Biology'),
('Statistics Tutoring', 1, 'Data Analysis and basic stats'),
('Resume/CV Review', 2, 'General resume review and feedback'),
('Cover Letter Writing', 2, 'Assistance writing compelling cover letters'),
('LinkedIn Optimization', 2, 'Tips for improving LinkedIn profiles'),
('Interview Prep', 2, 'Mock interviews and feedback'),
('Python Programming', 3, 'Help with Python syntax and logic'),
('Java Programming', 3, 'Object-oriented programming in Java'),
('C++ Programming', 3, 'Data structures in C++'),
('Web Development (React)', 3, 'Help with frontend React projects'),
('Backend (Node.js/Express)', 3, 'Building REST APIs'),
('Database (SQL)', 3, 'Database design and query writing'),
('Figma Design', 4, 'UI/UX prototyping using Figma'),
('Logo Design', 4, 'Creating simple logos for clubs/projects'),
('Video Editing (Premiere)', 4, 'Editing short videos or vlogs'),
('Photoshop Editing', 4, 'Photo retouching and manipulation'),
('Photography', 5, 'Taking headshots or event photos'),
('Errand Running', 5, 'Quick campus errands'),
('Flyer Distribution', 5, 'Handing out flyers for events'),
('Essay Proofreading', 6, 'Checking grammar and flow for essays'),
('Creative Writing', 6, 'Help brainstorming and writing stories'),
('Spanish Practice', 7, 'Conversational Spanish'),
('French Practice', 7, 'Conversational French'),
('Mandarin Practice', 7, 'Conversational Mandarin'),
('Guitar Lessons', 8, 'Beginner to intermediate guitar'),
('Piano Lessons', 8, 'Beginner piano chords and theory'),
('Vocal Coaching', 8, 'Basic singing techniques'),
('Weightlifting Form', 9, 'Gym companion for checking form'),
('Yoga Instruction', 9, 'Basic yoga stretches and routines'),
('PC Building', 10, 'Help picking parts and assembling a PC'),
('Mac Troubleshooting', 10, 'Help fixing software issues on macOS'),
('Virus Removal', 10, 'Scanning and removing malware');

-- 3. Insert Users (All mock users have password 'password123')
INSERT INTO "USER" (name, email, password_hash, department, year, reputation_score) VALUES
('Alice Smith', 'alice.smith@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Computer Science', 3, 4.8),
('Bob Johnson', 'bob.johnson@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Engineering', 2, 4.5),
('Charlie Brown', 'charlie.b@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Design', 4, 4.9),
('Diana Prince', 'diana.p@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Business', 1, 0.0),
('Evan Wright', 'evan.w@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Computer Science', 4, 5.0),
('Fiona Gallagher', 'fiona.g@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Biology', 2, 4.2),
('George Miller', 'george.m@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'History', 3, 3.8),
('Hannah Abbott', 'hannah.a@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Chemistry', 1, 0.0),
('Ian Chesterton', 'ian.c@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Physics', 4, 4.7),
('Jane Doe', 'jane.doe@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Mathematics', 2, 4.1),
('Kevin Hart', 'kevin.h@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Theater', 3, 4.6),
('Luna Lovegood', 'luna.l@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Art', 2, 4.4),
('Michael Scott', 'michael.s@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Business', 4, 3.5),
('Natalie Portman', 'natalie.p@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Psychology', 1, 0.0),
('Oliver Wood', 'oliver.w@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Sports Science', 3, 4.9),
('Penelope Clearwater', 'penelope.c@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'English', 4, 4.8),
('Quincy Adams', 'quincy.a@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Political Science', 2, 4.0),
('Rachel Green', 'rachel.g@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Fashion', 3, 4.2),
('Samwise Gamgee', 'samwise.g@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Agriculture', 1, 0.0),
('Tina Goldstein', 'tina.g@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Law', 4, 4.9),
('Ulysses Grant', 'ulysses.g@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'History', 2, 3.9),
('Victoria Beckham', 'victoria.b@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Music', 3, 4.5),
('Wade Wilson', 'wade.w@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Communications', 4, 4.1),
('Xena Warrior', 'xena.w@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Physical Education', 2, 4.7),
('Yusuf Amir', 'yusuf.a@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Economics', 1, 0.0);

-- 4. Insert User Phones
INSERT INTO USER_PHONE (user_id, phone_number) VALUES
(1, '555-0101'),(1, '555-0102'),(2, '555-0201'),(3, '555-0301'),(4, '555-0401'),
(5, '555-0501'),(6, '555-0601'),(7, '555-0701'),(8, '555-0801'),(9, '555-0901'),
(10, '555-1001'),(11, '555-1101'),(12, '555-1201'),(13, '555-1301'),(14, '555-1401'),
(15, '555-1501'),(16, '555-1601'),(17, '555-1701'),(18, '555-1801'),(19, '555-1901'),
(20, '555-2001'),(21, '555-2101'),(22, '555-2201'),(23, '555-2301'),(24, '555-2401'),
(25, '555-2501');

-- 5. Insert User Skills (Providers)
INSERT INTO USER_SKILL (user_id, skill_id, experience_level, hourly_rate, availability_status, availability) VALUES
(1, 10, 'Expert', 15.00, TRUE, 'Weekends'),
(1, 13, 'Intermediate', 20.00, TRUE, 'Mondays and Wednesdays'),
(2, 1, 'Expert', 12.50, TRUE, 'Tuesday, Thursday'),
(2, 2, 'Intermediate', 15.00, FALSE, 'Weekends'),
(3, 16, 'Expert', 25.00, TRUE, 'Everyday'),
(3, 17, 'Expert', 30.00, TRUE, 'Everyday'),
(5, 10, 'Expert', 18.00, TRUE, 'Fridays'),
(5, 6, 'Intermediate', 10.00, TRUE, 'Weekends'),
(6, 4, 'Expert', 15.00, TRUE, 'Monday evenings'),
(9, 2, 'Expert', 20.00, TRUE, 'Weekends'),
(10, 1, 'Expert', 20.00, TRUE, 'Wednesday mornings'),
(10, 5, 'Intermediate', 15.00, TRUE, 'Fridays'),
(11, 30, 'Expert', 25.00, TRUE, 'Weekends'),
(12, 19, 'Intermediate', 18.00, TRUE, 'Tuesday, Thursday'),
(13, 8, 'Intermediate', 15.00, TRUE, 'Mondays'),
(15, 31, 'Expert', 12.00, TRUE, 'Every morning'),
(16, 23, 'Expert', 20.00, TRUE, 'Weekends'),
(16, 24, 'Expert', 25.00, TRUE, 'Weekends'),
(20, 23, 'Intermediate', 15.00, TRUE, 'Wednesdays'),
(22, 29, 'Expert', 30.00, TRUE, 'Saturdays'),
(24, 32, 'Expert', 15.00, TRUE, 'Tuesdays and Thursdays'),
(25, 33, 'Intermediate', 20.00, TRUE, 'Weekends');

-- 6. Insert Service Requests
INSERT INTO SERVICE_REQUEST (requester_id, skill_id, description, preferred_date, status) VALUES
(4, 10, 'Need help debugging a Python loop assignment.', CURRENT_DATE + INTERVAL '2 days', 'Assigned'),
(2, 16, 'Need a basic wireframe for my engineering project app.', CURRENT_DATE + INTERVAL '5 days', 'Pending'),
(4, 6, 'Looking for someone to review my resume for a summer internship.', CURRENT_DATE + INTERVAL '1 day', 'Completed'),
(1, 17, 'Need a quick logo for a CS club hackathon.', CURRENT_DATE + INTERVAL '7 days', 'Pending'),
(7, 23, 'Can someone read my history essay and check the flow?', CURRENT_DATE + INTERVAL '3 days', 'Assigned'),
(8, 4, 'Struggling with the biology lab report, need tutoring.', CURRENT_DATE + INTERVAL '2 days', 'Completed'),
(14, 10, 'Help setting up Python environment on my new laptop.', CURRENT_DATE + INTERVAL '1 day', 'Pending'),
(17, 8, 'Need my LinkedIn reviewed for a poli-sci internship.', CURRENT_DATE + INTERVAL '4 days', 'Assigned'),
(19, 31, 'Want to learn how to deadlift safely.', CURRENT_DATE + INTERVAL '2 days', 'Pending'),
(21, 1, 'I have a calc midterm next week, need practice problems.', CURRENT_DATE + INTERVAL '5 days', 'Pending'),
(23, 19, 'Need to photoshop out a background for a presentation.', CURRENT_DATE + INTERVAL '1 day', 'Completed'),
(12, 13, 'React state management is confusing, help!', CURRENT_DATE + INTERVAL '3 days', 'Assigned'),
(6, 33, 'Building a PC and need someone to double check parts.', CURRENT_DATE + INTERVAL '6 days', 'Pending'),
(3, 10, 'Need a quick python script for data parsing.', CURRENT_DATE + INTERVAL '2 days', 'Completed'),
(18, 29, 'Want to learn basic piano chords for a song.', CURRENT_DATE + INTERVAL '10 days', 'Pending');

-- 7. Insert Service Assignments
INSERT INTO SERVICE_ASSIGNMENT (request_id, provider_id, assigned_date, completion_date, status) VALUES
(1, 1, CURRENT_TIMESTAMP - INTERVAL '1 day', NULL, 'Accepted'), -- ID 1
(3, 5, CURRENT_TIMESTAMP - INTERVAL '3 days', CURRENT_TIMESTAMP - INTERVAL '1 day', 'Completed'), -- ID 2
(5, 16, CURRENT_TIMESTAMP - INTERVAL '1 day', NULL, 'Accepted'), -- ID 3
(6, 6, CURRENT_TIMESTAMP - INTERVAL '4 days', CURRENT_TIMESTAMP - INTERVAL '2 days', 'Completed'), -- ID 4
(8, 13, CURRENT_TIMESTAMP - INTERVAL '1 day', NULL, 'Accepted'), -- ID 5
(11, 12, CURRENT_TIMESTAMP - INTERVAL '2 days', CURRENT_TIMESTAMP - INTERVAL '1 day', 'Completed'), -- ID 6
(12, 1, CURRENT_TIMESTAMP - INTERVAL '1 day', NULL, 'Accepted'), -- ID 7
(14, 5, CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP - INTERVAL '2 days', 'Completed'); -- ID 8

-- 8. Insert Feedback
INSERT INTO FEEDBACK (assignment_id, rating, comments, feedback_date) VALUES
(2, 5, 'Evan was incredibly helpful. My resume looks much better now!', CURRENT_TIMESTAMP - INTERVAL '12 hours'),
(4, 4, 'Fiona explained the biology concepts very clearly.', CURRENT_TIMESTAMP - INTERVAL '1 day'),
(6, 5, 'Luna was so quick with the photoshop request, looks awesome!', CURRENT_TIMESTAMP - INTERVAL '5 hours'),
(8, 5, 'Evan wrote a perfect script that saved me hours of manual work.', CURRENT_TIMESTAMP - INTERVAL '1 day');
