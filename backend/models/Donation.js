import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Donation", donationSchema);
