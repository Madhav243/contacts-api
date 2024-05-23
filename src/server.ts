import app from './app';
import sequelize from './database';

sequelize.sync().then(() => {
  console.log('Database connected and synced');
  const PORT = process.env.PORT || 3000;
  const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}...`);
  });
  process.on('unhandledRejection', (err : Error) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);// 0 for success and 1 for uncaught exception
    });
  });
});


