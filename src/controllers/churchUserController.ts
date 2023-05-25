import { RequestHandler } from "express";
import { ChurchUser } from "../models/churchUser";
import { comparePasswords, hashPassword } from "../services/auth";
import { signUserToken, verifyUser } from "../services/authService"



export const allUser: RequestHandler = async ( req, res, next ) => {
    let users = await ChurchUser.findAll();
    res.status(200).json(users)
}


export const createUser: RequestHandler = async ( req, res, next ) => {
    let newUser: ChurchUser = req.body;
    // if (
        
    //   newUser.email,
    //   newUser.password

    //   ) {
    //     let create = await ChurchUser.create(newUser);
        
    //     res.status(201).json(create);
    // }
    // else {
    //     res.status(400).send();
    // } 
    
    if (newUser.email && newUser.password) {
        // hassPass will go here 
    let hashedPasswrod = await hashPassword(newUser.password);
    newUser.password =hashedPasswrod;
      
    let create = await ChurchUser.create(newUser);
            res.status(200).json({
                email: create.email,
                userId: create.userId
            });
         
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
        let matchPass = await comparePasswords(req.body.password, validUser.password);
   

        // const matchPass = req.body.password === validUser.password;
    
        if (matchPass) {
            // if pass matches, generate token
            let token = await signUserToken(validUser);
            res.status(200).json({ token });
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
    let newUser= req.body;
    let user = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }
    if(user.userId !== userId){
        throw new error(Unauth)
    }
    
    let userId = req.params.id;
    
    
    console.log(req.body);
    newUser.userId = userId
    console.log(newUser);
    let findUser = await ChurchUser.findByPk(userId);
    if (findUser && findUser.userId === newUser.userId && newUser.email && newUser.password ){
        await ChurchUser.update(newUser,{where:{ userId}});
        res.status(200).json();
    }
    else{
        res.status(400).send("why");
    }

}



export const deleteUser: RequestHandler = async ( req, res, next ) => {
    let user = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }
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
