import dotenv from 'dotenv';


type Tconfig = {
    [key:string]: EnvironmentConfig
}

type DbConfig = {
    URI: string
}
type EnvironmentConfig = {
    auth0: Auth0Config;
    app: AppConfig
    db: DbConfig
    cloudinary: CloudinaryConfig;
}
type CloudinaryConfig = {
    cloudinary_name: string;
    api_key: string;
    api_secret: string;
  };

type AppConfig = {
    PORT: string | number
}
type Auth0Config = {
    client_origin: string,
    audience: string,
    issuer: string
  }

if (process.env.NODE_ENV === "production"){
    dotenv.config({path: ".env.production"})
}else {
    dotenv.config({path: ".env.development"})
} 

const ENV = process.env.NODE_ENV ?? "development";
const CONFIG: Tconfig = {
    development: {
        app: {
            PORT: process.env.PORT || 4001
        },
        db: {
            URI: process.env.MONGODB_URI || "mongodb://localhost:27017"
        },
        auth0: {
            client_origin: process.env.APP_ORIGIN || "error",
            audience: process.env.AUTH0_AUDIENCE || "error",
            issuer: process.env.AUTH0_ISSUER || "error"
          },
        cloudinary: {
            cloudinary_name: process.env.CLOUDINARY_NAME || "error",
            api_key: process.env.CLOUDINARY_API_KEY || "error",
            api_secret: process.env.CLOUDINARY_API_SECRET || "error",
          }
    },
    production: {
        app: {
            PORT: process.env.PORT || 8081
        },
        db: {
            URI: process.env.MONGODB_URI || "mongodb://localhost:27017"
        },
        auth0: {
            client_origin: process.env.APP_ORIGIN || "error",
            audience: process.env.AUTH0_AUDIENCE || "error",
            issuer: process.env.AUTH0_ISSUER || "error"
          },
        cloudinary: {
              cloudinary_name: process.env.CLOUDINARY_NAME || "error",
              api_key: process.env.CLOUDINARY_API_KEY || "error",
              api_secret: process.env.CLOUDINARY_API_SECRET || "error",
            }
    }
}

export default CONFIG[ENV]; 