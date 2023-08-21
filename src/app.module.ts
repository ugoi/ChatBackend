import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberModule } from './chat/member/member.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db', // name of the docker container running the DB
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'admin', // this should match POSTGRES_DB in your docker-compose file
      autoLoadEntities: true,
      synchronize: true,
    }),
    MemberModule,
    AuthModule,
    ChatModule,
    CommonModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


