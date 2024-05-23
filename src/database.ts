import { Sequelize } from 'sequelize';

require('dotenv').config({path:`${__dirname}/.env`});

const DB = process.env.DATABASE_URL?.replace('PASSWORD',process.env?.DATABASE_PASSWORD ?? '') ?? '';

const sequelize = new Sequelize(DB, {
  dialect: 'postgres',
});

export default sequelize;
