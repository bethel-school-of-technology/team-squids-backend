import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { ChurchUser } from "./churchUser";

export class Church extends Model<InferAttributes<Church>, InferCreationAttributes<Church>>{
    
    declare churchId: number;
    declare userId : number;
    declare churchName: string;
    declare street: string;
    declare city: string;
    declare state: string;
    declare zip: string;
    declare phoneNumber: string;
    declare welcomeMessage: string;
    declare serviceTime: string;
    declare imageUrl: string;
    declare website: string;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}
export function ChurchFactory(sequelize: Sequelize) {
  Church.init({
      churchId: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
      churchName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
      },
      
      street: {
          type: DataTypes.STRING,
          allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false
      },
      zip: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phoneNumber: {
          type: DataTypes.STRING,
          allowNull: false
      },
      welcomeMessage:{
        type: DataTypes.STRING,
        allowNull: true 
      },
      serviceTime: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true
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
      }
  }, {
      tableName: 'church',
      freezeTableName: true,
      sequelize
  });
}

export function AssociateUserChurch(){
  ChurchUser.hasMany(Church, { foreignKey: 'userId' });
  Church.belongsTo(ChurchUser, { foreignKey: 'userId' });
}