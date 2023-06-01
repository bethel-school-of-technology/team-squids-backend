import { Op, Sequelize } from "sequelize";
import { Church } from "../models/church";
import { RequestHandler } from "express";


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
      //     // { 'location.street': { [Op.like]: `%${query}%` } },
      //     // { 'location.city': { [Op.like]: `%${query}%` } },
      //     // { 'location.state': { [Op.like]: `%${query}%` } },
      //     // { 'location.zip': { [Op.like]: `%${query}%` } }
          // { 'location': { [Op.like]: `%${query}%` } },
          // { 'churchName': { [Op.like]: `%${query}%` } }
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('location')), 'LIKE', `%${query.toLowerCase()}%`),
          Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('churchName')), 'LIKE', `%${query.toLowerCase()}%`)

          // Sequelize.fn('lower', Sequelize.col('location'))
      
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











