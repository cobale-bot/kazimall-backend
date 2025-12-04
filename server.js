import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
app.use(express.json());

const adapter = new JSONFile("db.json");
const db = new Low(adapter, { technicians: [], bookings: [] });
await db.read();

app.get("/", (req, res) => res.json({ status: "KaziMall Backend Running" }));

// GET technicians
app.get("/technicians", (req, res) => {
  res.json(db.data.technicians);
});

// POST technician
app.post("/technicians", async (req, res) => {
  db.data.technicians.push(req.body);
  await db.write();
  res.json({ success: true });
});

// GET bookings
app.get("/bookings", (req, res) => {
  res.json(db.data.bookings);
});

// POST booking
app.post("/bookings", async (req, res) => {
  db.data.bookings.push(req.body);
  await db.write();
  res.json({ success: true });
});

app.listen(3000, () => console.log("Backend running on port 3000"));
