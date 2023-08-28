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
    ChatModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
