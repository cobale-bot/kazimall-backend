import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
app.use(express.json());

// Load db.json using LowDB
const adapter = new JSONFile("db.json");
const db = new Low(adapter);

// Ensure db has default structure
await db.read();
db.data ||= { technicians: [], bookings: [] };

// ROOT ROUTE
app.get("/", (req, res) => {
  res.json({ status: "KaziMall Backend Running" });
});

// GET all technicians
app.get("/technicians", async (req, res) => {
  res.json(db.data.technicians);
});

// ADD a technician
app.post("/technicians", async (req, res) => {
  db.data.technicians.push(req.body);
  await db.write();
  res.json({ success: true });
});

// ADD a booking
app.post("/bookings", async (req, res) => {
  db.data.bookings.push(req.body);
  await db.write();
  res.json({ success: true });
});

// Start server
app.listen(3000, () => console.log("Backend running on port 3000"));
