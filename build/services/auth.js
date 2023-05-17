"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePasswords = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (plainTextPassword) => {
    const saltRound = 12;
    const hash = await bcrypt_1.default.hash(plainTextPassword, saltRound);
    return hash;
};
exports.hashPassword = hashPassword;
const comparePasswords = async (plainTextPassword, hashPassword) => {
    return await bcrypt_1.default.compare(plainTextPassword, hashPassword);
};
exports.comparePasswords = comparePasswords;
