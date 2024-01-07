export {};

declare global {
     namespace NodeJS {
          interface ProcessEnv {
               DATABASE_URL: string;
               JWT_SECRET: string;
               PORT: number;
               FRONTEND_URL: string;
               NODE_ENV: string;
               NODEMAILER_PASS: string;
               NODEMAILER_EMAIL: string;
               GOOGLE_CLIENT_ID: string;
               GOOGLE_CLIENT_SECRET: string;
               CLOUDINARY_CLOUD_NAME: string;
               CLOUDINARY_API_SECRET: string;
               CLOUDINARY_API_KEY: string;
               REDIS_PASSWORD: string;
               REDIS_PORT: number;
               REDIS_HOST: string;
          }
     }
}
