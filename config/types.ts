export interface DatabaseConfig {
    name: string;
    user: string;
    password: string;
    host: string;
    port: number;
  }
  
export interface AuthConfig {
  jwt: {
    secret: string;
    expirationTime: string;
  };
}

export interface UnifiedConfig {
  database: DatabaseConfig;
  auth: AuthConfig;
}