import { RequestHandler } from "express";
import { Church} from "../models/church";
import { ChurchUser } from "../models/churchUser";
import { verifyUser } from "../services/authService";

export const createChurch: RequestHandler = async (req, res, next) => { 
  let user: ChurchUser | null = await verifyUser(req);
  if (!user) {
    return res.status(403).send("User is not signed In");
  }

  let newChurch: Church = req.body;
  newChurch.userId = user.userId;
  if (
      newChurch.churchName,
      newChurch.denomination,
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

let churchFound:Church[]= await Church.findAll();
res.json(churchFound)
}

export const getOneChurch: RequestHandler = async (req, res, next) => {
    let churchId = req.params.id;
    let church = await Church.findByPk(churchId);
    res.status(200).json(church);
  }

export const editChurch: RequestHandler = async (req, res, next) =>{
  let user: ChurchUser | null = await verifyUser(req);
  if (!user) {
    return res.status(403).send();
  }

    //let uer:
    let churchId = req.params.id;
    let newChurch:Church=req.body;
    let churchFound = await Church.findByPk(churchId);
    if (churchFound && churchFound.churchId ===newChurch.churchId && newChurch.userId &&newChurch.churchName && newChurch.denomination && newChurch.street && newChurch.city && newChurch.state && newChurch.zip && newChurch.phoneNumber && newChurch.churchEmail && newChurch.welcomeMessage && newChurch.serviceTime && newChurch.imageUrl && newChurch.website){
        await Church.update(newChurch,{where:{churchId:churchId}});
        res.status(200).json();
    }
    else{
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
