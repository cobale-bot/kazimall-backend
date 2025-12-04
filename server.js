import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node.js";

const app = express();
app.use(express.json());

// Load DB
const adapter = new JSONFile("db.json");
const db = new Low(adapter, { technicians: [], bookings: [] });
await db.read();

// Default route
app.get("/", (req, res) => {
  res.json({ status: "KaziMall Backend Running" });
});

// Get all technicians
app.get("/technicians", (req, res) => {
  res.json(db.data.technicians);
});

// Add technician
app.post("/technicians", async (req, res) => {
  db.data.technicians.push(req.body);
  await db.write();
  res.json({ success: true });
});

// Bookings endpoint
app.get("/bookings", (req, res) => {
  res.json(db.data.bookings);
});

app.post("/bookings", async (req, res) => {
  db.data.bookings.push(req.body);
  await db.write();
  res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
