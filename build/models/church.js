"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChurchFactory = exports.Church = void 0;
const sequelize_1 = require("sequelize");
class Church extends sequelize_1.Model {
}
exports.Church = Church;
function ChurchFactory(sequelize) {
    Church.init({
        churchId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        churchName: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: sequelize_1.DataTypes.NUMBER,
            allowNull: false
        },
        welcomeMessage: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        serviceTime: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: sequelize_1.DataTypes.BLOB,
            allowNull: false
        },
        website: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize_1.DataTypes.NOW,
        }
    }, {
        tableName: 'church',
        freezeTableName: true,
        sequelize
    });
}
exports.ChurchFactory = ChurchFactory;
