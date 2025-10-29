-- Add new tables to existing ngo_db database
-- Run this in MySQL Workbench or your MySQL client

USE ngo_db;

-- 1. Create campaigns table (for donation progress bars)
CREATE TABLE IF NOT EXISTS campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  goal DECIMAL(10, 2) NOT NULL,
  raised DECIMAL(10, 2) DEFAULT 0,
  donors INT DEFAULT 0,
  days_left INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 2. Create milestones table (for activity feed)
CREATE TABLE IF NOT EXISTS milestones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message TEXT NOT NULL,
  program VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Add campaign column to existing donations table (if not exists)
ALTER TABLE donations 
ADD COLUMN campaign VARCHAR(255) DEFAULT 'General Fund' AFTER amount,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER campaign;

-- 4. Add program and timestamp to existing volunteers table (if not exists)
ALTER TABLE volunteers 
ADD COLUMN program VARCHAR(255) AFTER skills,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER program;

-- 5. Insert sample campaigns
INSERT INTO campaigns (name, goal, raised, donors, days_left) VALUES
('Education for Underprivileged Children', 500000.00, 375000.00, 234, 15),
('Women Empowerment Initiative', 300000.00, 285000.00, 156, 8),
('Disaster Relief Fund', 750000.00, 450000.00, 389, 22),
('Healthcare Access Program', 400000.00, 320000.00, 198, 12);

-- 6. Insert sample milestones
INSERT INTO milestones (message, program, created_at) VALUES
('500 children received educational supplies', 'Education Initiative', NOW() - INTERVAL 1 HOUR),
('1,000 volunteers milestone reached!', 'Global Initiative', NOW() - INTERVAL 5 HOUR),
('Built 50 new classrooms in rural areas', 'Education Program', NOW() - INTERVAL 1 DAY),
('Provided healthcare to 10,000 families', 'Healthcare Initiative', NOW() - INTERVAL 2 DAY);

-- 7. Update existing donations with campaign names (if you have existing donations)
UPDATE donations SET campaign = 'Education Program' WHERE id % 3 = 0;
UPDATE donations SET campaign = 'Healthcare Access' WHERE id % 3 = 1;
UPDATE donations SET campaign = 'Disaster Relief' WHERE id % 3 = 2;

-- 8. Update existing volunteers with programs (if you have existing volunteers)
UPDATE volunteers SET program = 'Women Empowerment' WHERE id % 3 = 0;
UPDATE volunteers SET program = 'Disaster Response' WHERE id % 3 = 1;
UPDATE volunteers SET program = 'Health Initiative' WHERE id % 3 = 2;

SELECT '✅ Database tables created and sample data inserted!' as Status;
