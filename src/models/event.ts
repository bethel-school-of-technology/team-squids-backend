import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Church, Location } from "./church";

export class Event extends Model<
  InferAttributes<Event>,
  InferCreationAttributes<Event>
> {
  declare eventId: number;
  declare churchId: number;
  declare eventTitle: string;
  declare date: Date;
  declare location: Location | string;
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

      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      location:{
        type: DataTypes.JSON,
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
      collate: 'utf8_general_ci',
    }
  );
}

export function AssociateChurchEvent() {
  Church.hasMany(Event, { foreignKey: "churchId" });
  Event.belongsTo(Church, { foreignKey: "churchId" });
}
