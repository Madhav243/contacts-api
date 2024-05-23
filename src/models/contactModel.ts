import { DataTypes, Model } from "sequelize";
import sequelize from "../database";

export class Contact extends Model {
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
      allowNull: false,
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
