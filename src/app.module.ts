import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';
import databaseConfig from 'config/database.config';
import authConfig from 'config/auth.config';
import { DatabaseConfig } from 'config/types';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface ChatModuleOptions {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  autoLoadEntities: boolean;
  synchronize: boolean;
}


const getOrmConfig = (configService: ConfigService<{ database: DatabaseConfig }>): TypeOrmModuleOptions => {
    const dbConfig = configService.get('database', { infer: true });
    return {
        type: 'postgres' as const, // using `as const` to specify exact type
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.name,
        autoLoadEntities: true,
        synchronize: true,
    };
};

const getChatModuleConfig = (configService: ConfigService<{ database: DatabaseConfig }>): ChatModuleOptions => {
  const dbConfig = configService.get('database', { infer: true });
  return {
      type: 'postgres',
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.name,
      autoLoadEntities: true,
      synchronize: true,
  };
};


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authConfig],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getOrmConfig,
      inject: [ConfigService],
    }),
    AuthModule,
    ChatModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getChatModuleConfig,
      inject: [ConfigService],
  }),
  
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
