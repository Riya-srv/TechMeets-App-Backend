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

app.post("/events", async (req, res) => {
  try {
    const {
      title, date, startTime, endTime, type,
      image, host, description, speakers,
      price, dressCode, ageRestrictions, venue, tags
    } = req.body;
    if (!title || !date || !startTime || !endTime || !type || !image || !host || price === undefined) {
      return res.status(400).json({ 
        error: "Missing required fields: title, date, startTime, endTime, type, image, host, price"
      });
    }
    const newEvent = new MeetUps({
      title,
      date,
      startTime,
      endTime,
      type,
      image,
      host,
      description,
      speakers,
      price,
      dressCode,
      ageRestrictions,
      venue,
      tags
    });
    const saved = await newEvent.save();
    res.status(201).json({
      message: "Event created successfully",
      event: saved
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



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

async function readEventById(eventId) {
  try {
    const event = await MeetUps.findById(eventId);

    return event;
  } catch (error) {
    console.log(error);
  }
}

app.get("/events/:eventId", async (req, res) => {
  try {
    const event = await readEventById(req.params.eventId);

    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ error: "Event not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event." });
  }
});

app.delete("/events/id/:id", async (req, res) => {
  try {
    const deleted = await MeetUps.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.status(200).json({ message: "Event deleted successfully" });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event"});
  }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
