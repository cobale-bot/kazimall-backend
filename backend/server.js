import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const app = express();
app.use(express.json());

const adapter = new JSONFile("db.json");
const db = new Low(adapter, { technicians: [], bookings: [] });
await db.read();

app.get("/", (req, res) => res.json({ status: "KaziMall Backend Running" }));

app.post("/technicians", async (req, res) => {
  db.data.technicians.push(req.body);
  await db.write();
  res.json({ success: true });
});

app.post("/bookings", async (req, res) => {
  db.data.bookings.push(req.body);
  await db.write();
  res.json({ success: true });
});

app.listen(3000, () => console.log("Backend running on port 3000"));
