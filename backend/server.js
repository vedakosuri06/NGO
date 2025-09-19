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
