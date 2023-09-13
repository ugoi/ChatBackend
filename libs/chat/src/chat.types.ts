export interface ChatModuleOptions {
  db: {
    type: any;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    autoLoadEntities: boolean;
    synchronize: boolean;
  };
  inject?: any[];
  imports?: any[];
}

export interface ChatModuleAsyncOptions {
  useFactory: (...args: any[]) => Promise<ChatModuleOptions> | ChatModuleOptions;
  inject?: any[];
  imports?: any[];
}