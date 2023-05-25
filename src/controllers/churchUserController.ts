import { RequestHandler } from "express";
import { ChurchUser } from "../models/churchUser";
import { comparePasswords, hashPassword } from "../services/auth";
import { signUserToken, verifyUser } from "../services/authService"
import { Church } from "../models/church";
import { Event } from "../models/event";
import { Op } from "sequelize";





export const allUser: RequestHandler = async (req, res, next) => {
    let users = await ChurchUser.findAll();
    res.status(200).json(users)
}


export const createUser: RequestHandler = async (req, res, next) => {
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
        newUser.password = hashedPasswrod;

        let create = await ChurchUser.create(newUser);
        res.status(200).json({
            email: create.email,
            userId: create.userId
        });

    } else {
        res.status(400).send('Email and password required.')
    }
}


export const signInUser: RequestHandler = async (req, res, next) => {


    let validUser: ChurchUser | null = await ChurchUser.findOne({
        where: { email: req.body.email }
    });
    if (validUser) {
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



export const signOutUser: RequestHandler = async (req, res, next) => {


}


export const getUser: RequestHandler = async (req, res, next) => {
    // let user: ChurchUser | null = await verifyUser(req);

    // if (user) {
    //     let  { email } = user;
    //     res.status(200).json({
    //         email
    //     });
    // } else {
    //     res.status(401).send();
    // }
    const currentDate = new Date().toISOString().slice(0, 10);
    let churchUser = req.params.id;
    let user = await ChurchUser.findByPk(churchUser, {
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
    });
    res.status(200).json(user);
}

export const modifyUser: RequestHandler = async (req, res, next) => {
    let newUser = req.body;
    let user = await verifyUser(req);

    //Does the user exist? if yes contiune
    if (!user) {
        return res.status(403).send();
    }

    let userId = parseInt(req.params.id);
    newUser.userId = userId
    newUser.password = await hashPassword(newUser.password)

    //Is the user making the edit the same user editing themselves? if yes continue
    if (user.userId != userId) {
        return res.status(403).send("Not the same user");
    }

    let foundUser = await ChurchUser.findByPk(userId);
    if (!foundUser) {
        return res.status(404).send();
    }
    if (foundUser.dataValues.userId === parseInt(newUser.userId)) {
        await ChurchUser.update(newUser, { where: { userId } });
        res.status(200).json();
    }
    else {
        res.status(400).send();

    }
}



export const deleteUser: RequestHandler = async (req, res, next) => {
    let user = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let userId = parseInt(req.params.id);
    let findUser = await ChurchUser.findByPk(userId);

    //Is the user making the edit the same user editing themselves? if yes continue
    if (user.userId != userId) {
        return res.status(403).send("Not the same user");
    }

    if (findUser) {
        await ChurchUser.destroy({
            where: { userId: userId }

        });
        res.status(200).json();
    }
    else {
        res.status(404).json();

    }
}
