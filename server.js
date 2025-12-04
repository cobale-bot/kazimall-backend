const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let technicians = [
  {
    id: 1,
    name: "John Doe",
    skill: "Electrician",
    phone: "0712345678",
    rating: 4.5
  },
  {
    id: 2,
    name: "Jane Smith",
    skill: "Plumber",
    phone: "0798765432",
    rating: 4.8
  }
];

app.get("/", (req, res) => {
  res.json({ status: "KaziMall Backend Running" });
});

// GET technicians
app.get("/technicians", (req, res) => {
  res.json(technicians);
});

// ADD technician
app.post("/technicians", (req, res) => {
  const newTech = {
    id: technicians.length + 1,
    ...req.body
  };
  technicians.push(newTech);
  res.status(201).json(newTech);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
