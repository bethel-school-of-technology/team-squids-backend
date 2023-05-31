import { Sequelize } from "sequelize";

import { ChurchUserFactory} from "./churchUser";
import { ChurchFactory, AssociateUserChurch  } from "./church";
import { AssociateChurchEvent, EventFactory } from "./event";
import 'dotenv/config';

const dbName = process.env.DB_NAME ?? '';
const username = process.env.DB_USER ?? '';
const password = process.env.DB_PASS ?? '';
//const password = 'password1';
// const password = '0624';

const sequelize = new Sequelize(dbName, username, password, {
    host: '127.0.0.1',
    port: 3306,
    dialect: 'mysql'
});

ChurchFactory(sequelize);
EventFactory(sequelize);
ChurchUserFactory(sequelize);
AssociateUserChurch();
AssociateChurchEvent();

export const db = sequelize;