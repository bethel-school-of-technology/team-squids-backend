"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = require("./models");
const app = (0, express_1.default)();
function helloWorld(req, res, next) {
    res.send('Hello World');
}
app.use('/', helloWorld);
models_1.db.sync({ alter: true }).then(() => {
    console.info("Connected to the database!");
});
app.listen(3000);
