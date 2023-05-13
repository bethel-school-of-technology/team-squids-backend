"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssociateChurchEvent = exports.EventFactory = exports.Event = void 0;
const sequelize_1 = require("sequelize");
const church_1 = require("./church");
class Event extends sequelize_1.Model {
}
exports.Event = Event;
function EventFactory(sequelize) {
    Event.init({
        eventId: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        churchId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false
        },
        eventTitle: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        eventDate: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false
        },
        eventTime: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        eventAddress: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        eventType: {
            type: sequelize_1.DataTypes.STRING,
            validate: {
                isIn: [["Family", "Youth", "Young Adults", "Single", "Senior"]]
            },
            allowNull: false
        },
        description: {
            type: sequelize_1.DataTypes.STRING,
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
        freezeTableName: true,
        tableName: 'events',
        sequelize
    });
}
exports.EventFactory = EventFactory;
function AssociateChurchEvent() {
    church_1.Church.hasMany(Event, { foreignKey: 'churchId' });
    Event.belongsTo(church_1.Church, { foreignKey: 'churchId' });
}
exports.AssociateChurchEvent = AssociateChurchEvent;
