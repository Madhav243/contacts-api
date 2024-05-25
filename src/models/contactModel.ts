import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

export interface ContactInterface {
  id? : number,
  name : string,
  phoneNumber : string,
  userId : number | null,
  isSpam : boolean
}

export class Contact extends Model implements ContactInterface{
  id!: number;
  name!: string;
  phoneNumber!: string;
  userId!: number;
  isSpam!: boolean;
}

Contact.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isSpam: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "contacts",
  }
);
