import { RequestHandler } from "express";
import { Church } from "../models/church";
import { Event } from "../models/event";
import { Op } from "sequelize";
import { ChurchUser } from "../models/churchUser";
import { verifyUser } from "../services/authService";
  
  export const createChurch: RequestHandler = async (req, res, next) => { 
  let user: ChurchUser | null = await verifyUser(req);
  if (!user) {
    return res.status(403).send();
  }
  
  let newChurch: Church = req.body;
    
  if (
    newChurch.churchName,
    newChurch.denomination,
    newChurch.location,
    newChurch.street,
    newChurch.city,
    newChurch.state,
    newChurch.zip,
    newChurch.phoneNumber,
    newChurch.churchEmail,
    newChurch.welcomeMessage,
    newChurch.serviceTime,
    newChurch.imageUrl,
    newChurch.website
  ) {
    let created = await Church.create(newChurch);
    res.status(201).json(created);
  }
  else {
    res.status(400).send();
  }

}

export const getChurch: RequestHandler = async (req, res, next) => {
  let churchFound: Church[] = await Church.findAll({
    include: [
      {
        model: ChurchUser
      }
    ]
  });
  res.json(churchFound)
}

export const getOneChurch: RequestHandler = async (req, res, next) => {
  const churchId = req.params.id;
  const church = await Church.findByPk(churchId, {
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
  });

  if (church) {
    res.status(200).json(church);
  } else {
    res.status(404).send("Error: Church not found");
  }
};

export const editChurch: RequestHandler = async (req, res, next) =>{
  let user: ChurchUser | null = await verifyUser(req);
  if (!user) {
    return res.status(403).send();
  }

    
    let churchId = req.params.id;
    let editChurch: Church = req.body;
    let matchingCurch = await Church.findByPk(churchId) 
    
    //make sure same user who created be edit
    // let userId = req.body.userId;
    // let userFound = await ChurchUser.findByPk(userId);
    // if(!userFound || user.dataValues.userId !== user.userId){
    //   return res.status(403).send("Not the same user");
    // }
   // If the church that was requested has all of these attributes and userId is not changed, edit the church
    if (
         matchingCurch && 
         matchingCurch.churchId === matchingCurch.churchId && 
         matchingCurch.userId && 
         matchingCurch.churchName && 
         matchingCurch.denomination && 
         matchingCurch.denomination &&
         matchingCurch.street && 
         matchingCurch.city && 
         matchingCurch.state && 
         matchingCurch.zip && 
         matchingCurch.phoneNumber && 
         matchingCurch.churchEmail && 
         matchingCurch.welcomeMessage && 
         matchingCurch.serviceTime && 
         matchingCurch.imageUrl && 
         matchingCurch.website &&
         matchingCurch.churchId === editChurch.userId
         ){
        await Church.update(matchingCurch,{where:{churchId:churchId}});
        return res.status(200).send("church edited");
    }
    else {
        res.status(400).json();
    }
}

export const deleteChurch:RequestHandler = async(req,res, next) => {
  let user: ChurchUser | null = await verifyUser(req);
  if (!user) {
    return res.status(403).send();
  }
    
    let churchId = req.params.id;
    let churchFound = await Church.findByPk(churchId);
    //make sure same user who created be edit
    // let userId = req.body.userId;
    // let userFound = await ChurchUser.findByPk(userId);
    // if(!userFound || user.dataValues.userId !== user.userId){
    //   return res.status(403).send("Not the same user");
    // }

    if (churchFound){
        await Church.destroy({
            where:{churchId:churchId}
        });
        res.status(200).json();
  }
  else {
    res.status(404).json();

  }
}
