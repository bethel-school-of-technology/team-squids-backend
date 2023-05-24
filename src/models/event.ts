import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Church } from "./church";

export class Event extends Model<
  InferAttributes<Event>,
  InferCreationAttributes<Event>
> {
  declare eventId: number;
  declare churchId: number;
  declare eventTitle: string;
  declare eventDay: string;
  declare eventTime: string;
  declare eventDate: Date;
  declare eventStreet: string;
  declare eventCity: string;
  declare eventState: string;
  declare eventZip: string;
  declare eventType:
    | "Family"
    | "Youth"
    | "Young Adults"
    | "Single"
    | "Womans"
    | "Mens"
    | "Senior";
  declare description: string;
  declare imageUrl: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

export function EventFactory(sequelize: Sequelize) {
  Event.init(
    {
      eventId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      churchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      eventTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      eventDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      eventDay: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      eventTime: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      eventStreet: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      eventCity: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      eventState: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      eventZip: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      eventType: {
        type: DataTypes.STRING,
        validate: {
          isIn: [
            [
              "Family",
              "Youth",
              "Young Adults",
              "Single",
              "Womans",
              "Mens",
              "Senior",
            ],
          ],
        },
        allowNull: false,
      },

      description: {
        type: DataTypes.STRING(1000),
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      freezeTableName: true,
      tableName: "events",
      sequelize,
    }
  );
}

export function AssociateChurchEvent() {
  Church.hasMany(Event, { foreignKey: "churchId" });
  Event.belongsTo(Church, { foreignKey: "churchId" });
}
