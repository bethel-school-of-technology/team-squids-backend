import { Op } from "sequelize";
import { Church } from "../models/church";
import { RequestHandler } from "express";
import { searchChurch} from "../utilities/dbUtils"


// export const dbAddressSearch: RequestHandler = async ( req, res, next ) => {
//     try {
//         const location = req.query.location as string;
//         // searches based parameter in Model

//         const results = await Church.findAll({
//            where: {
//             // specify conditions each parameter
//             location: {
//                 street: {
//                     [Op.like]: `%${location}%`
//                 },
//                 city: {
//                     [Op.like]: `%${location}%`
//                 },
//                 state: {
//                     [Op.like]: `%${location}%`
//                 },
//                 zip: {
//                     [Op.like]: `%${location}%`
//                 }
//             }
//            } 
//         })
//         res.status(200).json(results);
//     } catch {
//         res.status(500).json('A error occured while searching items')
//     }
// }
// // I could put all search querys in the controller or sperate them out
// // Utils as seperate API and DB query
// // Service to combine both
// // searchController to handle controller logic for handling search req


// export const searchDatabase: RequestHandler = async (req, res, next) => {

//     const location = req.query.location as string;
//     console.log(location)
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




// export const searchDatabase: RequestHandler = async (req, res, next) => {
//   let searchQ = req.query.location as string;

//   try {
//     const resultsDB: Church[]  = await Church.findAll({
//       where:  {
//         [Op.or]: [
//            {street: { [Op.like]: `%${searchQ}%` }} ,
//            {city: { [Op.like]: `%${searchQ}%` } },
//           { state: { [Op.like]: `%${searchQ}%` } },
//           { zip: { [Op.like]: `%${searchQ}%` } }
//         ]
//       }
//     });

//     res.status(200).json(resultsDB);
//   } catch (err) {
//     res.status(500).json({ error: 'Database search query failed' });
//   }
// };

// async function searchChurchL(searchParams:{
//     street?: string;
//     city?: string;
//     state?: string;
//     zip?: string;
// }) {
//     const { street, city, state, zip } = searchParams;

//     const churches = await Church. findAll({

//         where: {
//             location:{
//                 street: street? { [Op.like]:`%${street}%`}: undefined  ,
//                 city: city? { [Op.like]:`%${city}%` }: undefined  ,
//                 state: state? { [Op.like]:`%${state}%`}: undefined,
//                 zip: zip? { [Op.like]:`%${zip}%`}: undefined 
//             }
//         }

//     });
//     return churches;
// }

export const searchDatabase: RequestHandler = async (req, res, next) => {
    const { street, city, state, zip } = req.query;

console.log(street, city, state, zip)
    try {
        const searchParams = {
            street: street as string,
            city: city as string,
            state: state as string,
            zip: zip as string,
        };

        const churches = await searchChurch(searchParams);
        res.status(200).json(churches);
    } catch (err) {
        res.status(500).json({ error: 'Database search query failed' });
    }
}















