import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

export interface UserInterface {
  id ? : number,
  name : string,
  phoneNumber : string,
  email ?: string,
  password : string,
  isSpam : boolean
}

export class User extends Model implements UserInterface{
  id!: number;
  name!: string;
  phoneNumber!: string;
  email?: string;
  password!: string;
  isSpam!: boolean;
  public toJSON(): object {
    const values = { ...this.get() };
    delete values.password;
    return values;
  }
}

User.init(
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
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSpam: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);
