import { User } from './userModel';
import { Contact } from './contactModel';

User.hasMany(Contact, { foreignKey: 'userId' });
Contact.belongsTo(User, { foreignKey: 'userId' });

export { User, Contact };
