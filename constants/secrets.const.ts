import { config } from 'dotenv';

config();

const secrets = {
     databaseUrl: process.env.DATABASE_URL,
     jwtSecret: process.env.JWT_SECRET,
     port: process.env.PORT,
     frontendUrl: process.env.FRONTEND_URL,
     nodeEnv: process.env.NODE_ENV,
     nodemailer: {
          pass: process.env.NODEMAILER_PASS,
          email: process.env.NODEMAILER_EMAIL,
     },
     google: {
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
     },
     cloudinary: {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME,
          apiSecret: process.env.CLOUDINARY_API_SECRET,
          apiKey: process.env.CLOUDINARY_API_KEY,
     },
     redis: {
          password: process.env.REDIS_PASSWORD,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
     },
};

export default secrets;
