const { faker } = require('@faker-js/faker');


const { DataTypes, Model, Sequelize } = require('sequelize');


const sequelize = new Sequelize('postgresql://phonebook_owner:5EuTJ7bkzvXB@ep-yellow-hall-a5obd5lg.us-east-2.aws.neon.tech/phonebook?sslmode=require', {
  dialect: 'postgres',
});

class Contact extends Model {
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

class User extends Model {
  id!: number;
  name!: string;
  phoneNumber!: string;
  email?: string;
  password!: string;
  isSpam!: boolean;
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


User.hasMany(Contact, { foreignKey: 'userId' });
Contact.belongsTo(User, { foreignKey: 'userId' });


const NUM_USERS = 10;
const NUM_CONTACTS_PER_USER = 20;

async function createRandomUser() {
  return await User.create({
    name: faker.name.fullName(),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  });
}

async function createRandomContact(userId: number) {
  return await Contact.create({
    name: faker.name.fullName(),
    phoneNumber: faker.phone.number(),
    userId: userId,
    isSpam: faker.datatype.boolean(),
  });
}

async function populateDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully.');

    for (let i = 0; i < NUM_USERS; i++) {
      const user = await createRandomUser();
      console.log(`Created user: ${user.name}`);

      for (let j = 0; j < NUM_CONTACTS_PER_USER; j++) {
        const contact = await createRandomContact(user.id);
        console.log(`Created contact: ${contact.name} for user: ${user.name}`);
      }
    }

    console.log('Database population complete.');
  } catch (error) {
    console.error('Error populating the database:', error);
  } finally {
    await sequelize.close();
  }
}

populateDatabase();
