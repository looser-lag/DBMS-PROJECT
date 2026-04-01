-- Campus Skill Exchange System - DML Seed Data (Exported)
-- Generated on: 2026-04-01T09:03:33.949Z

-- Data for CATEGORY
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
('Tech Support', 'Computer troubleshooting and software setup')
ON CONFLICT (category_name) DO NOTHING;

-- Data for SKILL
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
('Virus Removal', 10, 'Scanning and removing malware'),
('javascript tutoring', 1, 'Newly added skill')
ON CONFLICT (skill_name, category_id) DO NOTHING;

-- Data for "USER"
INSERT INTO "USER" (name, email, password_hash, department, year, reputation_score, role) VALUES
('Amphitere', 'nithinnaikprince0432@gmail.com', '$2b$10$NHQEC4uN8ClIILzbI4OYd./uaifXOx7ZgU2sz.ksEedS6aHqYzlP.', 'Data science', 3, '0.00', 'Both'),
('Alice Smith', 'alice.smith@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Computer Science', 3, '4.80', 'Provider'),
('Bob Johnson', 'bob.johnson@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Engineering', 2, '4.50', 'Provider'),
('Charlie Brown', 'charlie.b@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Design', 4, '4.90', 'Provider'),
('Diana Prince', 'diana.p@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Business', 1, '0.00', 'Receiver'),
('Evan Wright', 'evan.w@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Computer Science', 4, '5.00', 'Provider'),
('Fiona Gallagher', 'fiona.g@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Biology', 2, '4.20', 'Provider'),
('George Miller', 'george.m@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'History', 3, '3.80', 'Receiver'),
('Hannah Abbott', 'hannah.a@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Chemistry', 1, '0.00', 'Receiver'),
('Rachel Green', 'rachel.g@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Fashion', 3, '4.20', 'Receiver'),
('Samwise Gamgee', 'samwise.g@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Agriculture', 1, '0.00', 'Both'),
('Tina Goldstein', 'tina.g@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Law', 4, '4.90', 'Provider'),
('Ulysses Grant', 'ulysses.g@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'History', 2, '3.90', 'Receiver'),
('Victoria Beckham', 'victoria.b@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Music', 3, '4.50', 'Provider'),
('Ian Chesterton', 'ian.c@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Physics', 4, '4.70', 'Provider'),
('Jane Doe', 'jane.doe@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Mathematics', 2, '4.10', 'Receiver'),
('Kevin Hart', 'kevin.h@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Theater', 3, '4.60', 'Provider'),
('Luna Lovegood', 'luna.l@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Art', 2, '4.40', 'Provider'),
('Michael Scott', 'michael.s@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Business', 4, '3.50', 'Receiver'),
('Natalie Portman', 'natalie.p@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Psychology', 1, '0.00', 'Receiver'),
('Oliver Wood', 'oliver.w@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Sports Science', 3, '4.90', 'Provider'),
('Penelope Clearwater', 'penelope.c@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'English', 4, '4.80', 'Both'),
('Quincy Adams', 'quincy.a@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Political Science', 2, '4.00', 'Receiver'),
('Wade Wilson', 'wade.w@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Communications', 4, '4.10', 'Receiver'),
('Xena Warrior', 'xena.w@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Physical Education', 2, '4.70', 'Both'),
('Yusuf Amir', 'yusuf.a@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Economics', 1, '0.00', 'Receiver'),
('Nithin', 'nithin@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Computer Science', 2, '4.50', 'Provider'),
('Site Admin', 'admin@university.edu', '$2b$10$iGNbFmU9aNnsrJMrD6wu5OXtlplye.hsg8igf7YsN4MMo2EnaUDsW', 'Administration', 5, '5.00', 'Admin')
ON CONFLICT (email) DO NOTHING;

-- Data for USER_PHONE
INSERT INTO USER_PHONE (user_id, phone_number) VALUES
(1, '+91 98450 12345'),
(1, '+91 98450 67890'),
(2, '+91 99001 23456'),
(3, '+91 99887 76655'),
(4, '+91 91234 56789'),
(5, '+91 96543 21098'),
(6, '+91 99003 15409'),
(7, '+91 97412 12345'),
(8, '+91 98860 54321'),
(9, '+91 80501 23456'),
(10, '+91 70220 98765'),
(11, '+91 63621 54321'),
(12, '+91 94480 12345'),
(13, '+91 96112 34567'),
(14, '+91 81234 56789'),
(15, '+91 99723 12345'),
(16, '+91 99801 23456'),
(17, '+91 98800 12345'),
(18, '+91 97312 34567'),
(19, '+91 94490 87654'),
(20, '+91 95350 12345'),
(21, '+91 96200 54321'),
(22, '+91 91410 12345'),
(23, '+91 97400 98765'),
(24, '+91 90080 12345'),
(25, '+91 88840 54321'),
(22, '+91 99887 12345'),
(26, '+91 99887 12345'),
(28, '+91 9900315409')
ON CONFLICT (user_id, phone_number) DO NOTHING;

-- Data for USER_SKILL
INSERT INTO USER_SKILL (user_id, skill_id, experience_level, hourly_rate, availability_status) VALUES
(1, 10, 'Expert', '15.00', true),
(1, 13, 'Intermediate', '20.00', true),
(2, 1, 'Expert', '12.50', true),
(2, 2, 'Intermediate', '15.00', false),
(3, 16, 'Expert', '25.00', true),
(3, 17, 'Expert', '30.00', true),
(5, 10, 'Expert', '18.00', true),
(5, 6, 'Intermediate', '10.00', true),
(6, 4, 'Expert', '15.00', true),
(9, 2, 'Expert', '20.00', true),
(10, 1, 'Expert', '20.00', true),
(10, 5, 'Intermediate', '15.00', true),
(11, 30, 'Expert', '25.00', true),
(12, 19, 'Intermediate', '18.00', true),
(13, 8, 'Intermediate', '15.00', true),
(15, 31, 'Expert', '12.00', true),
(16, 23, 'Expert', '20.00', true),
(16, 24, 'Expert', '25.00', true),
(20, 23, 'Intermediate', '15.00', true),
(22, 29, 'Expert', '30.00', true),
(24, 32, 'Expert', '15.00', true),
(25, 33, 'Intermediate', '20.00', true),
(22, 28, 'Expert', '15.00', true),
(26, 28, 'Expert', '15.00', true),
(26, 36, 'Advanced', '200.00', true)
ON CONFLICT (user_id, skill_id) DO NOTHING;

-- Data for USER_SKILL_AVAILABILITY
INSERT INTO USER_SKILL_AVAILABILITY (user_id, skill_id, day_of_week) VALUES
(1, 10, 'Saturday'), (1, 10, 'Sunday'),
(1, 13, 'Monday'), (1, 13, 'Wednesday'),
(2, 1, 'Tuesday'), (2, 1, 'Thursday'),
(2, 2, 'Saturday'), (2, 2, 'Sunday'),
(3, 16, 'Monday'), (3, 16, 'Tuesday'), (3, 16, 'Wednesday'), (3, 16, 'Thursday'), (3, 16, 'Friday'), (3, 16, 'Saturday'), (3, 16, 'Sunday'),
(3, 17, 'Monday'), (3, 17, 'Tuesday'), (3, 17, 'Wednesday'), (3, 17, 'Thursday'), (3, 17, 'Friday'), (3, 17, 'Saturday'), (3, 17, 'Sunday'),
(5, 10, 'Friday'),
(5, 6, 'Saturday'), (5, 6, 'Sunday'),
(6, 4, 'Monday'),
(9, 2, 'Saturday'), (9, 2, 'Sunday'),
(10, 1, 'Wednesday'),
(10, 5, 'Friday'),
(11, 30, 'Saturday'), (11, 30, 'Sunday'),
(12, 19, 'Tuesday'), (12, 19, 'Thursday'),
(13, 8, 'Monday'),
(15, 31, 'Monday'), (15, 31, 'Tuesday'), (15, 31, 'Wednesday'), (15, 31, 'Thursday'), (15, 31, 'Friday'), (15, 31, 'Saturday'), (15, 31, 'Sunday'),
(16, 23, 'Saturday'), (16, 23, 'Sunday'),
(16, 24, 'Saturday'), (16, 24, 'Sunday'),
(20, 23, 'Wednesday'),
(22, 29, 'Saturday'),
(24, 32, 'Tuesday'), (24, 32, 'Thursday'),
(25, 33, 'Saturday'), (25, 33, 'Sunday'),
(22, 28, 'Monday'), (22, 28, 'Tuesday'), (22, 28, 'Wednesday'), (22, 28, 'Thursday'), (22, 28, 'Friday'), (22, 28, 'Saturday'), (22, 28, 'Sunday'),
(26, 28, 'Monday'), (26, 28, 'Tuesday'), (26, 28, 'Wednesday'), (26, 28, 'Thursday'), (26, 28, 'Friday'), (26, 28, 'Saturday'), (26, 28, 'Sunday'),
(26, 36, 'Saturday'), (26, 36, 'Sunday')
ON CONFLICT (user_id, skill_id, day_of_week) DO NOTHING;

-- Data for SERVICE_REQUEST
INSERT INTO SERVICE_REQUEST (request_id, requester_id, skill_id, description, preferred_date, status) VALUES
(1, 4, 10, 'Need help debugging a Python loop assignment.', '2026-04-02T18:30:00.000Z', 'Assigned'),
(2, 2, 16, 'Need a basic wireframe for my engineering project app.', '2026-04-05T18:30:00.000Z', 'Pending'),
(3, 4, 6, 'Looking for someone to review my resume for a summer internship.', '2026-04-01T18:30:00.000Z', 'Completed'),
(4, 1, 17, 'Need a quick logo for a CS club hackathon.', '2026-04-07T18:30:00.000Z', 'Pending'),
(5, 7, 23, 'Can someone read my history essay and check the flow?', '2026-04-03T18:30:00.000Z', 'Assigned'),
(6, 8, 4, 'Struggling with the biology lab report, need tutoring.', '2026-04-02T18:30:00.000Z', 'Completed'),
(7, 14, 10, 'Help setting up Python environment on my new laptop.', '2026-04-01T18:30:00.000Z', 'Pending'),
(8, 17, 8, 'Need my LinkedIn reviewed for a poli-sci internship.', '2026-04-04T18:30:00.000Z', 'Assigned'),
(9, 19, 31, 'Want to learn how to deadlift safely.', '2026-04-02T18:30:00.000Z', 'Pending'),
(10, 21, 1, 'I have a calc midterm next week, need practice problems.', '2026-04-05T18:30:00.000Z', 'Pending'),
(11, 23, 19, 'Need to photoshop out a background for a presentation.', '2026-04-01T18:30:00.000Z', 'Completed'),
(12, 12, 13, 'React state management is confusing, help!', '2026-04-03T18:30:00.000Z', 'Assigned'),
(13, 6, 33, 'Building a PC and need someone to double check parts.', '2026-04-06T18:30:00.000Z', 'Pending'),
(14, 3, 10, 'Need a quick python script for data parsing.', '2026-04-02T18:30:00.000Z', 'Completed'),
(15, 18, 29, 'Want to learn basic piano chords for a song.', '2026-04-10T18:30:00.000Z', 'Pending')
ON CONFLICT (request_id) DO NOTHING;

-- Data for SERVICE_ASSIGNMENT
INSERT INTO SERVICE_ASSIGNMENT (assignment_id, request_id, provider_id, assigned_date, completion_date, status) VALUES
(1, 1, 1, '2026-03-30T19:49:43.681Z', NULL, 'Accepted'),
(2, 3, 5, '2026-03-28T19:49:43.681Z', '2026-03-30T19:49:43.681Z', 'Completed'),
(3, 5, 16, '2026-03-30T19:49:43.681Z', NULL, 'Accepted'),
(4, 6, 6, '2026-03-27T19:49:43.681Z', '2026-03-29T19:49:43.681Z', 'Completed'),
(5, 8, 13, '2026-03-30T19:49:43.681Z', NULL, 'Accepted'),
(6, 11, 12, '2026-03-29T19:49:43.681Z', '2026-03-30T19:49:43.681Z', 'Completed'),
(7, 12, 1, '2026-03-30T19:49:43.681Z', NULL, 'Accepted'),
(8, 14, 5, '2026-03-26T19:49:43.681Z', '2026-03-29T19:49:43.681Z', 'Completed')
ON CONFLICT (assignment_id) DO NOTHING;

-- Data for FEEDBACK
INSERT INTO FEEDBACK (assignment_id, rating, comments, feedback_date) VALUES
(2, 5, 'Evan was incredibly helpful. My resume looks much better now!', '2026-03-31T07:49:43.681Z'),
(4, 4, 'Fiona explained the biology concepts very clearly.', '2026-03-30T19:49:43.681Z'),
(6, 5, 'Luna was so quick with the photoshop request, looks awesome!', '2026-03-31T14:49:43.681Z'),
(8, 5, 'Evan wrote a perfect script that saved me hours of manual work.', '2026-03-30T19:49:43.681Z')
ON CONFLICT (assignment_id) DO NOTHING;

