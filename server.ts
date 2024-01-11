import mongoose from 'mongoose';
import app from './app';
import secrets from './constants/secrets.const';
import seedDatabase from './seeders';

const port = secrets.port;

app.listen(port, async () => {
     console.log(`[⚡server]: connected successfully on http://localhost:${port}`);
     try {
          await mongoose.connect(secrets.databaseUrl);
          await seedDatabase();
          console.log(`[⚡database]: connected successfully`);
     } catch (error) {
          console.error('[❌database]: unable to connect to db', error);
     }
});
