import { RequestHandler } from "express";
import { request } from "http";
import { verifyUser } from "../services/authService";
import { Event } from "../models/event";
import { Church } from "../models/church";
import { ChurchUser } from "../models/churchUser";
import { Op } from "sequelize";

export const getAllEvents: RequestHandler = async (req, res, next) => {
    //Basic return of all events
    let EventsInDB: Event[] = await Event.findAll({
        include: [
            {
              model: Church,
              include: [
                {
                  model: ChurchUser
                }
              ]
            }
          ]
    });
    res.json(EventsInDB)
}

export const getEvent: RequestHandler = async (req, res, next) => {
    let eventId = req.params.eventId

    let foundEvent = await Event.findByPk(eventId, {
        include: [
            {
                model: Church,
                include: [
                    {
                      model: Event,
                      where: {
                        eventDate: {
                          [Op.gte]: Date.now()
                        }
                      }
                    },
                    {
                        model: ChurchUser
                    }
                ]
            }   
        ]
    })

    //Finding if the requested event object exists, then sending it
    if (foundEvent) {
        res.status(200).json(foundEvent);
    } else {
        res.status(404).json();
    }
}

export const getTenEvents: RequestHandler = async (req, res, next) => {
    //searching for events and returning 10

    //Getting this allows us to search
    const { Op } = require('sequelize');

    //converts the query to string so we can use it to search
    let query = req.params.query.toString()

    //Searching all event objects with matching parameters
    let foundEvents = await Event.findAll({
        limit: 10,
        offset: 0,
        //This is the part where it is comparing \/
        where: {
            [Op.or]: [
                { eventTitle: { [Op.like]: `%${query}%` } },
                { eventAddress: { [Op.like]: `%${query}%` } },
                { org: { [Op.like]: `%${query}%` } }
            ]
        }
    })
    if (foundEvents) {
        res.status(200).json(foundEvents);
    } else {
        res.status(404).json();
    }
}

export const createEvent: RequestHandler = async (req, res, next) => {
    let user: ChurchUser | null = await verifyUser(req);
    if (!user) {
        return res.status(403).send();
    }

        let newEvent: Event = req.body;
        if (
            newEvent.churchId,
            newEvent.eventTitle,
            newEvent.location,
            newEvent.eventDate,
            newEvent.eventStreet,
            newEvent.eventCity,
            newEvent.eventState,
            newEvent.eventZip,
            newEvent.eventType,
            newEvent.description
        ) {
            let church: Church | null = await Church.findByPk(newEvent.churchId)
            if (church === null) {
                return res.status(400).send()
            }

            if (user.dataValues.userId != church.userId) {
                return res.status(401).send("Not the same user")
            }

            let created = await Event.create(newEvent);
            if (created) {
                return res.status(200).json(created);
            }

            return res.status(400).json("error");
        } 
        else {
            return res.status(400).send("Data is of the wrong format");
        }
}

export const updateEvent: RequestHandler = async (req, res, next) => {
    let user: ChurchUser | null = await verifyUser(req);
    if (!user) {
        return res.status(403).send();
    }

    let eventIdNum = parseInt(req.params.eventId);
    let editedEvent: Event = req.body;
    let matchingEvent = await Event.findByPk(eventIdNum);

    //Is the account the same one that created the church? If so continue
    let churchId = req.body.churchId;
    let church = await Church.findByPk(churchId);
    if (!church || church.dataValues.userId !== user.userId) {
        return res.status(403).send("Not the same user");
    }

    // If the event that was requested has all of these attributes and the churchId is not changed, edit the event
    if (
        matchingEvent &&
        matchingEvent.eventId == eventIdNum &&
        editedEvent.eventTitle &&
        editedEvent.location &&
        editedEvent.eventStreet &&
        editedEvent.description &&
        editedEvent.eventDate &&
        editedEvent.eventType &&
        editedEvent.eventCity &&
        editedEvent.eventState &&
        editedEvent.eventZip &&
        matchingEvent.churchId === editedEvent.churchId // Ensure the churchId is not changed
    ) {
        await Event.update(editedEvent, { where: { eventId: eventIdNum } });
        return res.status(200).send("Event edited");
    } else {
        return res.status(400).send("Not enough data");
    }
};

export const deleteEvent: RequestHandler = async (req, res, next) => {
    let user: ChurchUser | null = await verifyUser(req);
    if (!user) {
        return res.status(403).send();
    }

    let eventId = req.params.eventId;
    let foundEvent = await Event.findByPk(eventId);

    //Is the account the same one that created the church? If so continue
    let church = await Church.findByPk(foundEvent?.churchId);
    if (!church || church.dataValues.userId !== user.userId) {
        return res.status(403).send("Not the same user");
    }

    //if the user is verified and the event is found, delete it
    if (foundEvent) {
        await Event.destroy({
            where: { eventId: eventId }
        });
        res.status(200).json();
    } else {
        res.status(404).json();
    }
}