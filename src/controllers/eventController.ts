import { RequestHandler } from "express";
import { verifyUser } from "../services/authService";
import { Event } from "../models/event";
import { Church } from "../models/church";
import { ChurchUser } from "../models/churchUser";
import { Op } from "sequelize";
import { getUser } from "./churchUserController";

export const getAllEvents: RequestHandler = async (req, res, next) => {

  try {
    let events: Event[] = await Event.findAll({
      include: [
        {
          model: Church,
          include: [ChurchUser],
        },
      ],
    });

    // Parse location string for each church
    events = events.map((event) => {
      if (typeof event.location === "string") {
        event.location = JSON.parse(event.location);
      }
      return event;
    });

    res.json(events);
  } catch (error: any) {
    res
      .status(500)
      .send(error.message || "Some error occurred while retrieving events.");
  }
};

export const getEvent: RequestHandler = async (req, res, next) => {

  try {
    const eventId = req.params.eventId;

    let event = await Event.findByPk(eventId, {
      include: [
        {
          model: Church,
          include: [ChurchUser],
          required: false, // Make this relation optional
        },
      ],
    });

    if (!event) {
      return res.status(404).send("Error: Event not found");
    }

    if (typeof event.location === "string") {
      event.location = JSON.parse(event.location);
    }

    res.status(200).json(event);
  } catch (error: any) {
    res
      .status(500)
      .send(error.message || "Some error occurred while retrieving the Event.");
  }
};
export const getUserEvents: RequestHandler = async (req, res, next) => {

  // const currentDate = new Date().toISOString().slice(0, 10);
  let userId = req.params.userId;
  let events = await Event.findAll({
    include: [
      {
        model: Church,
        include: [ChurchUser],
        required: true, // Make this relation optional
        where: {
          userId: userId
        }
      },
    ],
  });
  // If location is a string, parse it
  events = events.map((event) => {
    if (typeof event.location === "string") {
      event.location = JSON.parse(event.location);
    }
    return event;
  });



  res.status(200).json(events);
}



export const getTenEvents: RequestHandler = async (req, res, next) => {


  try {
    let events: Event[] = await Event.findAll({
      limit: 10,
      offset: 0,
      include: [
        {
          model: Church,
          include: [ChurchUser],
        },
      ],
    });

    // Parse location string for each church
    events = events.map((event) => {
      if (typeof event.location === "string") {
        event.location = JSON.parse(event.location);
      }
      return event;
    });

    res.json(events);
  } catch (error: any) {
    res
      .status(500)
      .send(error.message || "Some error occurred while retrieving events.");
  }
};

export const createEvent: RequestHandler = async (req, res, next) => {

  try {
    let user: ChurchUser | null = await verifyUser(req);
    if (!user) {
      return res.status(403).send();
    }

    const newEvent: Event = req.body;

    const church: Church | null = await Church.findByPk(newEvent.churchId);

    if (!church) {
      return res.status(400).json({ error: "Invalid church ID" });
    }

    if (church.userId !== user.userId) {
      return res.status(401).send("Not authorized");
    }

    if (typeof newEvent.location !== "string") {
      newEvent.location = JSON.stringify(newEvent.location);
    }

    if (
      newEvent.eventTitle &&
      newEvent.date &&
      newEvent.location &&
      newEvent.eventType &&
      newEvent.description &&
      newEvent.imageUrl
    ) {
      let created = await Event.create(newEvent);

      // If location is a string, parse it
      if (typeof created.location === "string") {
        created.location = JSON.parse(created.location);
      }

      res.status(201).json(created);
    } else {
      res.status(400).send();
    }
  } catch (error: any) {
    res
      .status(500)
      .send(error.message || "Some error occurred while creating the Event.");
  }
};

export const updateEvent: RequestHandler = async (req, res, next) => {
  try {
    let user: ChurchUser | null = await verifyUser(req);
    if (!user) {
      return res.status(403).send();
    }

    let eventId = req.params.eventId;
    let editEventData: Event = req.body;

    // If location is an object, stringify it
    if (typeof editEventData.location !== "string") {
      editEventData.location = JSON.stringify(editEventData.location);
    }

    let matchingEvent = await Event.findByPk(eventId);
    if (!matchingEvent) {
        return res.status(401).send("Not the same church")
    } else {
      // Make sure the same user who created it is editing
      let churchId = req.body.churchId;
      if (!churchId || matchingEvent.churchId !== churchId) {
        return res.status(401).send("Not the same user");
      }
    }

    if (
      editEventData &&
      editEventData.eventTitle &&
      editEventData.date &&
      editEventData.eventType &&
      editEventData.description &&
      editEventData.imageUrl &&
      editEventData.location
    ) {
  await Event.update(editEventData, { where: { eventId: eventId } });
  return res.status(200).send("Event edited");
} else {
  return res.status(400).json();
}
  } catch (error: any) {
  res
    .status(500)
    .send(error.message || "Some error occurred while editing the Event.");
}
};

export const deleteEvent: RequestHandler = async (req, res, next) => {
  try {
    const user: ChurchUser | null = await verifyUser(req);
    if (!user) {
      return res.status(403).send();
    }

    const eventId: number = parseInt(req.params.eventId);
    const event: Event | null = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const church: Church | null = await Church.findByPk(event.churchId);
    if (!church || church.userId !== user.userId) {
      return res.status(401).send("Not authorized");
    }

    await Event.destroy({ where: { eventId: eventId } });
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
