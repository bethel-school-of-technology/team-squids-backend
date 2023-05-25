import { RequestHandler } from "express";
import { ChurchUser } from "../models/churchUser";
import { Church } from "../models/church";
import { Event } from "../models/event";
import { Op } from "sequelize";





export const allUser: RequestHandler = async (req, res, next) => {
    let users = await ChurchUser.findAll();
    res.status(200).json(users)
}


export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: ChurchUser = req.body;
    if (

        newUser.email,
        newUser.password

    ) {
        let create = await ChurchUser.create(newUser);

        res.status(201).json(create);
    }
    else {
        res.status(400).send();
    }

    // if (newUser.email && newUser.password) {
    //     // hassPass will go here 

    //         let create = await ChurchUser.create(newUser);
    //         res.status(200).json({
    //             email: create.email,
    //             passward: create.password,
    //             userId: create.userId
    //         });

    // } else {
    //     res.status(400).send('Email and password required.')
    // }
}


export const signInUser: RequestHandler = async (req, res, next) => {

    let validUser: ChurchUser | null = await ChurchUser.findOne({
        where: { email: req.body.email }
    });
    if (validUser) {
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
        include: [{
            model: Church,
            where: {
                userId: churchUser
            }
        }, 
        {
            model: Event,
            where: {
                churchId: {
                    [Op.col]: 'ChurchUser.churchId'}, // foreign key
                eventDate: {
                    [Op.gte]: currentDate
                }
            } 
        }

        ]
    });
    res.status(200).json(user);
}



export const modifyUser: RequestHandler = async (req, res, next) => {
    let churchUser = req.params.id;
    let newUser: ChurchUser = req.body;
    let findUser = await ChurchUser.findByPk(churchUser);
    if (findUser && findUser.userId === newUser.userId && newUser.email && newUser.password) {
        await ChurchUser.update(newUser, { where: { userId: churchUser } });
        res.status(200).json();
    }
    else {
        res.status(400).json();
    }

}


export const deleteUser: RequestHandler = async (req, res, next) => {
    let churchUser = req.params.id;
    let findUser = await ChurchUser.findByPk(churchUser);
    if (findUser) {
        await ChurchUser.destroy({
            where: { userId: churchUser }
        });
        res.status(200).json();
    }
    else {
        res.status(404).json();

    }
}
