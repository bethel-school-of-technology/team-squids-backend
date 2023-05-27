import axios from "axios";
import { RequestHandler } from "express";

// API URL call with axios 

export const searchAPI: RequestHandler = async (req, res, next) => {

    const location = req.query.location as string;
    // const address = req.query.address as string (query address of API - street, city, state)

    try {
        const repsonse = await axios.get('${API}/search', {
            params: {
                location,
                // address
            }
        });
        return repsonse.data.results;
    } catch (err) {
        res.status(404).json("API Search Failed");
    }
};
