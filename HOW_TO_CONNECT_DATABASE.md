# 🚀 Quick Database Connection Guide

## Your Database is Already Configured! ✅

**Database Details:**
- Host: `localhost`
- User: `root`
- Password: `Vedakosuri@123`
- Database: `ngo_db`

## Step 1: Add New Tables (One-Time Setup)

You need to add 2 new tables to your existing database:

### Option A: Using MySQL Workbench
1. Open **MySQL Workbench**
2. Connect to your database
3. Open the file: `backend/add_new_tables.sql`
4. Click **Execute** (⚡ lightning icon)

### Option B: Using Command Line
```powershell
cd "c:\Users\Veda Kosuri\Documents\PROJECTS\NGO DBMS\NGO-Website\backend"
mysql -u root -p ngo_db < add_new_tables.sql
# Enter password when prompted: Vedakosuri@123
```

### Option C: Using phpMyAdmin
1. Open phpMyAdmin
2. Select `ngo_db` database
3. Go to **SQL** tab
4. Copy and paste contents of `add_new_tables.sql`
5. Click **Go**

## Step 2: Start Backend Server

```powershell
cd "c:\Users\Veda Kosuri\Documents\PROJECTS\NGO DBMS\NGO-Website\backend"
npm install
npm start
```

You should see:
```
✅ Connected to MySQL database!
🚀 Server running on port 5000
```

## Step 3: Start Frontend

```powershell
cd "c:\Users\Veda Kosuri\Documents\PROJECTS\NGO DBMS\NGO-Website\frontend\frontend"
npm start
```

## That's it! 🎉

The website will now:
- ✅ Fetch real campaign data from your database
- ✅ Show live donation activity feed
- ✅ Display volunteer sign-ups
- ✅ Show milestones
- ✅ All in Indian Rupees (₹) with Indian names

## New Tables Added:
1. **campaigns** - Stores donation campaign goals and progress
2. **milestones** - Stores achievement milestones

## Updated Existing Tables:
- **donations** - Added `campaign` and `created_at` columns
- **volunteers** - Added `program` and `created_at` columns

## API Endpoints Now Available:
- `GET http://localhost:5000/campaigns` - Get all campaigns
- `GET http://localhost:5000/activities/recent` - Get recent activities
- All your existing endpoints still work!

---

## Troubleshooting

**If you get "Table already exists" error:**
- That's okay! It means the table was already created. The script uses `IF NOT EXISTS` to prevent errors.

**If backend doesn't connect:**
1. Make sure MySQL is running
2. Check if password in `.env` is correct: `Vedakosuri@123`
3. Verify database `ngo_db` exists

**To verify tables were created:**
```sql
USE ngo_db;
SHOW TABLES;
-- You should see: campaigns, milestones (plus your existing tables)
```
