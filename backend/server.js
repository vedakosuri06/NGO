import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database!");
  }
});

// ✅ Root route
app.get("/", (req, res) => {
  res.send("NGO Backend is running...");
});

/* ----------------------------
   DONORS
---------------------------- */
app.get("/donors", (req, res) => {
  db.query("SELECT * FROM donors", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/donors", (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    "INSERT INTO donors (name, email, phone) VALUES (?, ?, ?)",
    [name, email, phone],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "✅ Donor added", donorId: results.insertId });
    }
  );
});

/* ----------------------------
   DONATIONS
---------------------------- */
app.get("/donations", (req, res) => {
  db.query("SELECT * FROM donations", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/donations", (req, res) => {
  const { donor_id, amount, date } = req.body;
  db.query(
    "INSERT INTO donations (donor_id, amount, date) VALUES (?, ?, ?)",
    [donor_id, amount, date],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "✅ Donation added", donationId: results.insertId });
    }
  );
});

/* ----------------------------
   VOLUNTEERS
---------------------------- */
app.get("/volunteers", (req, res) => {
  db.query("SELECT * FROM volunteers", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/volunteers", (req, res) => {
  const { name, email, skills } = req.body;
  db.query(
    "INSERT INTO volunteers (name, email, skills) VALUES (?, ?, ?)",
    [name, email, skills],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "✅ Volunteer added", volunteerId: results.insertId });
    }
  );
});

/* ----------------------------
   EVENTS
---------------------------- */
app.get("/events", (req, res) => {
  db.query("SELECT * FROM events", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/events", (req, res) => {
  const { title, description, date } = req.body;
  db.query(
    "INSERT INTO events (title, description, date) VALUES (?, ?, ?)",
    [title, description, date],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "✅ Event added", eventId: results.insertId });
    }
  );
});

/* ----------------------------
   BENEFICIARIES
---------------------------- */
app.get("/beneficiaries", (req, res) => {
  db.query("SELECT * FROM beneficiaries", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/beneficiaries", (req, res) => {
  const { name, age, need } = req.body;
  db.query(
    "INSERT INTO beneficiaries (name, age, need) VALUES (?, ?, ?)",
    [name, age, need],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "✅ Beneficiary added", beneficiaryId: results.insertId });
    }
  );
});

/* ----------------------------
   START SERVER
---------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

/* ----------------------------
   CAMPAIGNS (for Progress Bars)
---------------------------- */
app.get("/campaigns", (req, res) => {
  db.query("SELECT * FROM campaigns ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/campaigns", (req, res) => {
  const { name, goal, raised, donors, days_left } = req.body;
  db.query(
    "INSERT INTO campaigns (name, goal, raised, donors, days_left) VALUES (?, ?, ?, ?, ?)",
    [name, goal, raised, donors, days_left],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "✅ Campaign added", campaignId: results.insertId });
    }
  );
});

/* ----------------------------
   ACTIVITY FEED (Recent Activities)
---------------------------- */
app.get("/activities/recent", (req, res) => {
  const limit = req.query.limit || 8;
  
  // Get recent donations
  const donationsQuery = `
    SELECT 
      'donation' as type,
      donors.name as name,
      donations.amount,
      donations.campaign,
      donations.created_at as time
    FROM donations
    LEFT JOIN donors ON donations.donor_id = donors.id
    ORDER BY donations.created_at DESC
    LIMIT ?
  `;
  
  // Get recent volunteers
  const volunteersQuery = `
    SELECT 
      'volunteer' as type,
      name,
      program,
      created_at as time
    FROM volunteers
    ORDER BY created_at DESC
    LIMIT ?
  `;
  
  // Get recent milestones
  const milestonesQuery = `
    SELECT 
      'milestone' as type,
      message,
      program,
      created_at as time
    FROM milestones
    ORDER BY created_at DESC
    LIMIT ?
  `;
  
  // Execute all queries
  Promise.all([
    new Promise((resolve, reject) => {
      db.query(donationsQuery, [limit], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(volunteersQuery, [limit], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    }),
    new Promise((resolve, reject) => {
      db.query(milestonesQuery, [limit], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    })
  ])
  .then(([donations, volunteers, milestones]) => {
    // Combine and sort by time
    const activities = [...donations, ...volunteers, ...milestones]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, limit);
    
    res.json(activities);
  })
  .catch(err => {
    res.status(500).json({ error: err.message });
  });
});

// ...existing code...

/* ----------------------------
   LOGIN
---------------------------- */
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  // Replace with your actual user table and password check
  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
        res.json({ message: "Login successful", user: results[0] });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    }
  );
});
// ...existing code...
// ...existing code...
app.post("/register", (req, res) => {
  const { email, password } = req.body;
  // For production, hash the password!
  db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "Registration successful" });
    }
  );
});
// ...existing code...