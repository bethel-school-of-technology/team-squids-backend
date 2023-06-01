import { RequestHandler } from "express";
import { Church } from "../models/church";
import { Op } from "sequelize";


// export const searchDatabase: RequestHandler = async (req, res, next) => {

//     const location = req.query.location as string;

//     try {
//         const resultsDB = await Church.findAll({
//             where: {
//                 location: {
//                     street: {
//                         [Op.like]: `%${location}%`
//                     },
//                     city: {
//                         [Op.like]: `%${location}%`
//                     },
//                     state: {
//                         [Op.like]: `%${location}%`
//                     },
//                     zip: {
//                         [Op.like]: `%${location}%`
//                     }
//                 }
//             }
//         });

//         res.status(200).json(resultsDB);

//     } catch (err) {
//         res.status(404).json({ error: 'Database search query failed' });
//     }
// };

export const searchExample = async function (location:{
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
}): Promise<Church[]> {
    // const { street, city, state, zip } = searchParams;

    const churches = await Church. findAll({

        where: {
            [Op.or]: [
                {'location.street': location.street},
                {'location.city': location.city},
                {'location.state': location.state},
                {'location.zip': location.zip}
            ]

            // location:{
            //     street: street? { [Op.like]:`%${street}%`}: undefined  ,
            //     city: city? { [Op.like]:`%${city}%` }: undefined  ,
            //     state: state? { [Op.like]:`%${state}%`}: undefined,
            //     zip: zip? { [Op.like]:`%${zip}%`}: undefined 
            // }
            // street: street? { [Op.like]:`%${street}%`}: undefined  ,
            // city: city? { [Op.like]:`%${city}%` }: undefined  ,
            // state: state? { [Op.like]:`%${state}%`}: undefined,
            // zip: zip? { [Op.like]:`%${zip}%`}: undefined
        }
    
    });
    return churches;
};
