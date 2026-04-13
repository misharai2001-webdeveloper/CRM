const mongoose = require("mongoose");
const Lead = require("./models/Lead");

mongoose.connect("mongodb://127.0.0.1:27017/crm")
  .then(async () => {
    console.log("MongoDB connected");

    // update ALL leads where status is New or missing
    const result = await Lead.updateMany(
      { $or: [{ status: "New" }, { status: { $exists: false } }] },
      { $set: { status: "Ongoing" } }
    );

    console.log("Leads updated:", result.modifiedCount);

    process.exit();
  })
  .catch(err => console.log(err));