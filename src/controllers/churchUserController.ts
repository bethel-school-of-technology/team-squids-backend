import { RequestHandler } from "express";
import { ChurchUser } from "../models/churchUser";




export const allUser: RequestHandler = async ( req, res, next ) => {
    let users = await ChurchUser.findAll();
    res.status(200).json(users)
}


export const createUser: RequestHandler = async ( req, res, next ) => {
    let newUser: ChurchUser = req.body;
    
    if (newUser.email && newUser.password) {
        // hassPass will go here 
        try {
            let create = await ChurchUser.create(newUser);
            res.status(200).json({
                email: create.email,
                userId: create.userId
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error.')
        }
    } else {
        res.status(400).send('Email and password required.')
    }
}


export const signInUser: RequestHandler = async ( req, res, next ) => {

let validUser: ChurchUser | null = await ChurchUser.findOne({
    where: {email: req.body.email}
});
    if (validUser){
   // add authenication 

    const matchPass = req.body.password === validUser.password;
    
    if (matchPass) {
        // if pass matches, generate token
        // let token = await tknSignUser(validUser);
        res.status(200).json({ message: 'Authentication successful' });
    } else {
        res.status(401).json('Password invalid');
    } 
    } else {
        res.status(401).json('Email invalid')
    }
};
    


export const signOutUser: RequestHandler = async ( req, res, next ) => {
    

}


export const getUser: RequestHandler = async ( req, res, next ) => {
    // let user: ChurchUser | null = await verifyUser(req);

    // if (user) {
    //     let  { email } = user;
    //     res.status(200).json({
    //         email
    //     });
    // } else {
    //     res.status(401).send();
    // }
    let churchUser = req.params.id;
    let user = await ChurchUser.findByPk(churchUser);
    res.status(200).json(user);
  }



export const modifyUser: RequestHandler = async ( req, res, next ) => {
    let churchUser = req.params.id;
    let newUser: ChurchUser =  req.body;
    let findUser = await ChurchUser.findByPk(churchUser);
    if (findUser && findUser.userId === newUser.userId && newUser.email && newUser.password ){
        await ChurchUser.update(newUser,{where:{ userId: churchUser }});
        res.status(200).json();
    }
    else{
        res.status(400).json();
    }

}


export const deleteUser: RequestHandler = async ( req, res, next ) => {
    let churchUser = req.params.id;
    let findUser = await ChurchUser.findByPk(churchUser);
    if (findUser){
        await ChurchUser.destroy({
            where:{userId: churchUser}
        });
        res.status(200).json();
  }
  else {
      res.status(404).json();
  
    }
  }
