import { connectDB } from "@/lib/mongodb"; // ✅ Ensure correct import
import Fundraiser from "@/models/Fundraiser"; // ✅ Import the Fundraiser model

export async function GET() {
  try {
    await connectDB(); // ✅ Connect to MongoDB

    const fundraisers = await Fundraiser.find().sort({ createdAt: -1 }); // ✅ Fetch latest fundraisers

    return Response.json({ success: true, fundraisers });
  } catch (error) {
    console.error("❌ Error fetching fundraisers:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
