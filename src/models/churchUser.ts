import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";
import { Church } from "./church";


export class ChurchUser extends Model<InferAttributes<ChurchUser>, InferCreationAttributes<ChurchUser>>{
    declare userId: number;
    declare churchId: number;
    declare email: string;
    declare password: string;
    
}

export function ChurchUserFactory( sequelize: Sequelize ) {
    ChurchUser.init({
        userId:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        churchId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
          
        }
    },{
        freezeTableName: true,
        tableName: 'churchUser',
        sequelize
    })
}



export function AssociateUserChurch(){
    ChurchUser.hasMany(Church, { foreignKey: 'userId' });
    Church.belongsTo(ChurchUser, { foreignKey: 'userId' });
}