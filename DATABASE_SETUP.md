# Database Setup Instructions

## Step 1: Run the SQL Schema

1. Open your MySQL client (MySQL Workbench, phpMyAdmin, or command line)
2. Connect to your database
3. Run the SQL file: `backend/database_schema.sql`

```bash
# If using MySQL command line:
mysql -u your_username -p your_database_name < backend/database_schema.sql
```

## Step 2: Start the Backend Server

```bash
cd backend
npm install
npm start
```

The backend should start on `http://localhost:5000`

## Step 3: Start the Frontend

```bash
cd frontend/frontend
npm install
npm start
```

The frontend should start on `http://localhost:3000` (or 3001 if 3000 is busy)

## What's New:

### Backend API Endpoints Added:

1. **GET /campaigns** - Fetches all active donation campaigns
2. **POST /campaigns** - Creates a new campaign
3. **GET /activities/recent?limit=8** - Fetches recent activities (donations, volunteers, milestones)

### Database Tables Added:

1. **campaigns** - Stores donation campaigns with goals and progress
2. **milestones** - Stores achievement milestones
3. **donations** - Updated to include campaign name and timestamp
4. **volunteers** - Updated to include program and timestamp

### Frontend Components Updated:

1. **DonationProgressBars.js** - Now fetches real campaign data from `/campaigns` endpoint
2. **ActivityFeed.js** - Now fetches real activity data from `/activities/recent` endpoint

Both components have fallback sample data if the backend is not running.

## Testing:

1. Make sure your MySQL database is running
2. Ensure the backend server is running on port 5000
3. The frontend will automatically fetch data every 30 seconds
4. Add new donations/volunteers through your existing forms to see them appear in the activity feed!

## Sample Data Included:

- 4 active campaigns
- 4 milestones
- 3 recent donations
- 3 sample donors

You can modify these in the SQL file before running it.
