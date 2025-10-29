-- Add campaigns table for donation progress bars
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

-- Add milestones table for activity feed
CREATE TABLE IF NOT EXISTS milestones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  message TEXT NOT NULL,
  program VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Update donations table to include campaign name
ALTER TABLE donations 
ADD COLUMN IF NOT EXISTS campaign VARCHAR(255) DEFAULT 'General Fund',
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Update volunteers table to include program and timestamp
ALTER TABLE volunteers 
ADD COLUMN IF NOT EXISTS program VARCHAR(255),
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Update donors table to ensure name column exists
ALTER TABLE donors 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Insert sample campaigns
INSERT INTO campaigns (name, goal, raised, donors, days_left) VALUES
('Education for Underprivileged Children', 500000, 375000, 234, 15),
('Women Empowerment Initiative', 300000, 285000, 156, 8),
('Disaster Relief Fund', 750000, 450000, 389, 22),
('Healthcare Access Program', 400000, 320000, 198, 12);

-- Insert sample milestones
INSERT INTO milestones (message, program) VALUES
('500 children received educational supplies', 'Education Initiative'),
('1,000 volunteers milestone reached!', 'Global Initiative'),
('Built 50 new classrooms in rural areas', 'Education Program'),
('Provided healthcare to 10,000 families', 'Healthcare Initiative');

-- Insert sample recent donations (with donor_id references)
-- Note: Make sure you have donors with these IDs first
INSERT INTO donations (donor_id, amount, campaign, created_at) VALUES
(1, 2500, 'Education Program', NOW() - INTERVAL 2 MINUTE),
(2, 5000, 'Healthcare Access', NOW() - INTERVAL 2 HOUR),
(3, 10000, 'Disaster Relief', NOW() - INTERVAL 6 HOUR);

-- Insert sample donors if they don't exist
INSERT INTO donors (name, email, phone) VALUES
('Anonymous', 'anonymous@ngo.org', '0000000000'),
('Rajesh Kumar', 'rajesh.kumar@email.com', '9876543210'),
('Vikram Singh', 'vikram.singh@email.com', '9876543211')
ON DUPLICATE KEY UPDATE name=name;
