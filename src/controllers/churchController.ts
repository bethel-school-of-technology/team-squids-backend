import { RequestHandler } from "express";
import { Church} from "../models/church";
// import { comparePasswords, hashPassword } from "../services/auth";
// import { signUserToken, verifyUser } from "../services/authService";

export const createChurch: RequestHandler = async (req, res, next) => { 
  let newChurch: Church = req.body;
  if (
      
      newChurch.churchName,
      newChurch.denomination,
      newChurch.street,
      newChurch.city,
      newChurch.state,
      newChurch.zip,
      newChurch.phoneNumber,
      newChurch.email,
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
   
    let churchId = req.params.id;
    let newChurch:Church=req.body;
    let churchFound = await Church.findByPk(churchId);
    if (churchFound && churchFound.churchId ===newChurch.churchId && newChurch.userId &&newChurch.churchName && newChurch.denomination && newChurch.street && newChurch.city && newChurch.state && newChurch.zip && newChurch.phoneNumber && newChurch.email && newChurch.welcomeMessage && newChurch.serviceTime && newChurch.imageUrl && newChurch.website){
        await Church.update(newChurch,{where:{churchId:churchId}});
        res.status(200).json();
    }
    else{
        res.status(400).json();
    }
}

export const deleteChurch:RequestHandler = async(req,res, next) => {
    
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
