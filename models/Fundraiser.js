import mongoose from "mongoose";

const FundraiserSchema = new mongoose.Schema({
  title: String,
  description: String,
  amountNeeded: Number,
  amountRaised: Number,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Fundraiser || mongoose.model("Fundraiser", FundraiserSchema);
