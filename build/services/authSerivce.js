"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.signUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const church_1 = require("../models/church");
const secret = 'Tea, Earl Grey, Hot';
const signUserToken = async (church) => {
    let token = jsonwebtoken_1.default.sign({ churchId: church.churchId }, secret, { expiresIn: '1hr' });
    return token;
};
exports.signUserToken = signUserToken;
const verifyUser = async (req) => {
    // Get the Authorization header from the request
    const authHeader = req.headers.authorization;
    // If header exists, parse token from `Bearer <token>`
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // Verify the token and get the user
        try {
            let decoded = await jsonwebtoken_1.default.verify(token, secret);
            return church_1.Church.findByPk(decoded.churchId);
        }
        catch (err) {
            return null;
        }
    }
    else {
        return null;
    }
};
exports.verifyUser = verifyUser;
