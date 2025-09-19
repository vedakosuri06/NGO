import express from "express";
import Donation from "../models/Donation.js";

const router = express.Router();

// Get all donations
router.get("/", async (req, res) => {
  const donations = await Donation.find();
  res.json(donations);
});

// Create donation
router.post("/", async (req, res) => {
  const { donorName, amount } = req.body;
  const donation = new Donation({ donorName, amount });
  await donation.save();
  res.json(donation);
});

export default router;
