// import { searchAPI } from "../utilities/apiUtils";
// import { searchDatabase } from "../utilities/dbUtils";
// import { RequestHandler } from "express";


// export const runSearch: RequestHandler = async ( req, res, next) => {
//     // const city = req.query.city?.toString() || ''; //optional chaining & default value
//     // const state = req.query.state?.toString() || '';
//     // const zip = req.query.zip?.toString() || '';
//     const location = req.query.location?.toString() || '';
    
//     try {
//         const apiResults = await searchAPI( location );
//         const dbResults = await searchDatabase( location );

//         const combineResults = [ ...dbResults, ...apiResults];

//         res.status(200).json({ results: combineResults});
//     } catch (err) {
//         res.status(404).json({ error: 'Search results failed'})
//     }
// }
