import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
    jwt: {
      secret: process.env.JWT_SECRET,
      expirationTime: process.env.JWT_EXPIRATION_TIME,
    },
  }));
  