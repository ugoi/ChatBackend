export interface ChatModuleOptions {
  db: {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    autoLoadEntities: boolean;
    synchronize: boolean;
  };
}
