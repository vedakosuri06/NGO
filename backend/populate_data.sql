-- ========================================
-- POPULATE NGO DATABASE WITH SAMPLE DATA
-- ========================================
-- Just copy-paste this entire file into MySQL!

USE ngo_db;

-- Step 1: Make sure tables have the required columns
ALTER TABLE donations ADD COLUMN IF NOT EXISTS campaign VARCHAR(255) DEFAULT 'General Fund';
ALTER TABLE donations ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

ALTER TABLE volunteers ADD COLUMN IF NOT EXISTS program VARCHAR(255);
ALTER TABLE volunteers ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Step 2: Add Donors (if you don't have them already)
INSERT INTO donors (name, email, phone) VALUES
('Rajesh Kumar', 'rajesh.kumar@email.com', '9876543210'),
('Priya Sharma', 'priya.sharma@email.com', '9876543211'),
('Vikram Singh', 'vikram.singh@email.com', '9876543212'),
('Anjali Patel', 'anjali.patel@email.com', '9876543213'),
('Amit Gupta', 'amit.gupta@email.com', '9876543214'),
('Anonymous', 'anonymous@ngo.org', '0000000000')
ON DUPLICATE KEY UPDATE name=name;

-- Step 3: Add Campaigns (for progress bars)
INSERT INTO campaigns (name, goal, raised, donors, days_left) VALUES
('Education for Underprivileged Children', 500000.00, 375000.00, 234, 15),
('Women Empowerment Initiative', 300000.00, 285000.00, 156, 8),
('Disaster Relief Fund', 750000.00, 450000.00, 389, 22),
('Healthcare Access Program', 400000.00, 320000.00, 198, 12);

-- Step 4: Add Recent Donations (for activity feed)
INSERT INTO donations (donor_id, amount, campaign, created_at) VALUES
(6, 2500, 'Education Program', NOW()),
(1, 5000, 'Healthcare Access', NOW() - INTERVAL 2 HOUR),
(2, 10000, 'Disaster Relief', NOW() - INTERVAL 6 HOUR),
(3, 3500, 'Women Empowerment', NOW() - INTERVAL 12 HOUR),
(4, 7500, 'Education Program', NOW() - INTERVAL 1 DAY),
(5, 15000, 'Healthcare Access', NOW() - INTERVAL 2 DAY);

-- Step 5: Add Volunteers (for activity feed)
INSERT INTO volunteers (name, email, skills, program, created_at) VALUES
('Priya Sharma', 'priya.v1@email.com', 'Teaching, Mentoring', 'Women Empowerment', NOW() - INTERVAL 15 MINUTE),
('Anjali Patel', 'anjali.v1@email.com', 'Social Work', 'Disaster Response', NOW() - INTERVAL 3 HOUR),
('Meera Reddy', 'meera.reddy@email.com', 'Healthcare', 'Health Initiative', NOW() - INTERVAL 8 HOUR),
('Rahul Verma', 'rahul.verma@email.com', 'Community Development', 'Education Program', NOW() - INTERVAL 1 DAY),
('Sneha Iyer', 'sneha.iyer@email.com', 'Project Management', 'Women Empowerment', NOW() - INTERVAL 2 DAY);

-- Step 6: Add Milestones (for activity feed)
INSERT INTO milestones (message, program, created_at) VALUES
('500 children received educational supplies', 'Education Initiative', NOW() - INTERVAL 1 HOUR),
('1,000 volunteers milestone reached!', 'Global Initiative', NOW() - INTERVAL 5 HOUR),
('Built 50 new classrooms in rural areas', 'Education Program', NOW() - INTERVAL 1 DAY),
('Provided healthcare to 10,000 families', 'Healthcare Initiative', NOW() - INTERVAL 2 DAY),
('Trained 200 women in vocational skills', 'Women Empowerment', NOW() - INTERVAL 3 DAY);

-- ========================================
-- VERIFICATION QUERIES
-- ========================================
SELECT '✅ Campaigns Added:' as Status;
SELECT * FROM campaigns;

SELECT '✅ Recent Donations:' as Status;
SELECT d.id, don.name as donor, d.amount, d.campaign, d.created_at 
FROM donations d 
LEFT JOIN donors don ON d.donor_id = don.id 
ORDER BY d.created_at DESC 
LIMIT 10;

SELECT '✅ Recent Volunteers:' as Status;
SELECT name, program, created_at FROM volunteers ORDER BY created_at DESC LIMIT 10;

SELECT '✅ Milestones:' as Status;
SELECT * FROM milestones ORDER BY created_at DESC;

SELECT '🎉 DATABASE POPULATED SUCCESSFULLY!' as Result;
