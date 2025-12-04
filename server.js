import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
app.use(express.json());

// Setup LowDB
const adapter = new JSONFile("db.json");
const db = new Low(adapter, { technicians: [], bookings: [] });
await db.read();
db.data ||= { technicians: [], bookings: [] };

// Default route
app.get("/", (req, res) => {
  res.json({ status: "KaziMall Backend Running" });
});

// === TECHNICIANS ===
app.get("/technicians", async (req, res) => {
  await db.read();
  res.json(db.data.technicians);
});

app.post("/technicians", async (req, res) => {
  db.data.technicians.push(req.body);
  await db.write();
  res.json({ success: true, message: "Technician saved" });
});

// === BOOKINGS ===
app.get("/bookings", async (req, res) => {
  await db.read();
  res.json(db.data.bookings);
});

app.post("/bookings", async (req, res) => {
  db.data.bookings.push(req.body);
  await db.write();
  res.json({ success: true, message: "Booking saved" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
