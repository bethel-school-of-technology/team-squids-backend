import { Op, Sequelize } from "sequelize";
import { Church } from "../models/church";
import { RequestHandler } from "express";
import { Event } from "../models/event";


// Simiple search function 
export const searchChurch: RequestHandler = async (req, res, next) => {
  // Convert the search query to lowercase
  let query = req.params.query.toLowerCase();
  // Minimum length of the search query
  const minimumQueryLength = 3;
  // Check if the query has fewer characters than the minimum length
  if (query.length < minimumQueryLength) {
    return res.status(400).json({ error: 'Search query must have at least 3 characters' });
  }
  try {
    let resultsDB = await Church.findAll({
      where: {
        [Op.or]: [
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('churchName')), 'LIKE', `%${query.toLowerCase()}%`),
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('location')), 'LIKE', `%${query.toLowerCase()}%`),
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('denomination')), 'LIKE', `%${query.toLowerCase()}%`),
        ]
      }

    });

    resultsDB = resultsDB.map((church) => {
      if (typeof church.location === "string") {
        church.location = JSON.parse(church.location);
      }
      return church;
    });

    res.status(200).json(resultsDB);
    console.log(resultsDB);
  } catch (err) {
    res.status(404).json({ error: 'Database search query failed' });
  }
};


export const searchEvent: RequestHandler = async (req, res, next) => {
  // Convert the search query to lowercase
  let query = req.params.query.toLowerCase();
  // Minimum length of the search query
  const minimumQueryLength = 3;
  // Check if the query has fewer characters than the minimum length
  if (query.length < minimumQueryLength) {
    return res.status(400).json({ error: 'Search query must have at least 3 characters' });
  }
  try {
    let resultsDB = await Event.findAll({
      include: [{
        model:Church
      }],
      where: {
        [Op.or]: [
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('Event.location')), 'LIKE', `%${query.toLowerCase()}%`),
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('eventType')), 'LIKE', `%${query.toLowerCase()}%`),
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('churchName')), 'LIKE', `%${query.toLowerCase()}%`),
          //  Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('date')), 'LIKE', `%${query.toLowerCase()}%`),

        ]
      },
      
    
    });

    resultsDB = resultsDB.map((event) => {
      if (typeof event.location === "string") {
        event.location = JSON.parse(event.location);
      }
      return event;
    });

    res.status(200).json(resultsDB);
    console.log(resultsDB);
  } catch (err) {
    res.status(500).json(err);
  }
};











