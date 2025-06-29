const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const MeetUps = require("./models/MeetUps.models");
const cors = require("cors");
require("dotenv").config();
initializeDatabase();

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(express.json());
app.use(cors(corsOptions));


app.get("/events", async (req, res) => {
  try {
    const events = await MeetUps.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

app.get("/events/title/:title", async (req, res) => {
  try {
    const event = await MeetUps.findOne({ title: req.params.title });
    if (!event) {
      return res.status(404).json({ error: "Event not found." });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event by given title." });
  }
});

app.get("/events/tags/:tag", async (req, res) => {
  try {
    const events = await MeetUps.find({ tags: req.params.tag });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events by given tag." });
  }
});

app.get("/events/type/:type", async (req, res) => {
  try {
    const events = await MeetUps.find({ type: req.params.type });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event by given type." });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
