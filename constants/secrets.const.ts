import { config } from 'dotenv';

config();

const secrets = {
     databaseUrl: <string>process.env.DATABASE_URL,
     jwtSecret: <string>process.env.JWT_SECRET,
     port: <number | string>process.env.PORT,
     frontendUrl: <string>process.env.FRONTEND_URL,
     nodeEnv: <string>process.env.NODE_ENV,
     nodemailer: {
          pass: <string>process.env.NODEMAILER_PASS,
          email: <string>process.env.NODEMAILER_EMAIL,
     },
     google: {
          clientId: <string>process.env.GOOGLE_CLIENT_ID,
          clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
     },
     cloudinary: {
          cloudName: <string>process.env.CLOUDINARY_CLOUD_NAME,
          apiSecret: <string>process.env.CLOUDINARY_API_SECRET,
          apiKey: <string>process.env.CLOUDINARY_API_KEY,
     },
     redis: {
          password: <string>process.env.REDIS_PASSWORD,
          host: <string>process.env.REDIS_HOST,
          port: <number | string>process.env.REDIS_PORT,
     },
};

export default secrets;
