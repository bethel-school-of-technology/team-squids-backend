import { Sequelize } from "sequelize";

import { ChurchFactory } from "./church";

const dbName = 'ChurchDB';
const username = 'root';
// const password = 'Password1!';
const password = '0624';

const sequelize = new Sequelize(dbName, username, password, {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});

ChurchFactory(sequelize);

export const db = sequelize;