import { DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize } from "sequelize";


export class ChurchUser extends Model<InferAttributes<ChurchUser>, InferCreationAttributes<ChurchUser>>{
    declare userId: number;

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


