import csv from "csv-parser";
import { Readable } from "stream";
import Lead from "../models/Lead.js";

export const uploadLeadsCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const results = [];
    const stream = Readable.from(req.file.buffer);

    stream
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          name: data.name,
          email: data.email,
          source: data.source,
          location: data.location || "Mumbai",
          language: data.language || "English",
          status: "Ongoing",   // default
          type: "Warm",        // default
        });
      })
      .on("end", async () => {
        await Lead.insertMany(results);
        res.json({ message: "CSV Uploaded", count: results.length });
      });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Upload failed" });
  }
};