"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const modules_1 = require("./modules");
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const churchRoutes_1 = __importDefault(require("./routes/churchRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
function helloWorld(req, res, next) {
    res.send('Hello World');
}
app.use('/api/events', eventRoutes_1.default);
app.use('/api/church', churchRoutes_1.default);
app.use('/', helloWorld);
modules_1.db.sync({ alter: true }).then(() => {
    console.info("Connected to the database!");
});
app.listen(3000);
