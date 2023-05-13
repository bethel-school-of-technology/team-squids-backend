"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const church_1 = require("./church");
const event_1 = require("./event");
const dbName = 'ChurchDB';
const username = 'root';
const password = 'Password1!';
const sequelize = new sequelize_1.Sequelize(dbName, username, password, {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});
(0, church_1.ChurchFactory)(sequelize);
(0, event_1.EventFactory)(sequelize);
(0, event_1.AssociateChurchEvent)();
exports.db = sequelize;
