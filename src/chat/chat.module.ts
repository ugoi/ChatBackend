import { DynamicModule, Module, Global } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MessageModule } from './messages/messages.module';
import { BotsModule } from './bots/bots.module';
import { GroupChannelsModule } from './group-channels/group-channels.module';
import { ChatModuleAsyncOptions, ChatModuleOptions } from './chat.types';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [MessageModule, GroupChannelsModule, BotsModule],
    controllers: [ChatController],
    providers: [ChatService],
    exports: [ChatService],
})
export class ChatModule {
    static forRoot(options: ChatModuleOptions): DynamicModule {
        const imports = [
            ...options.imports,
            TypeOrmModule.forRoot({
                type: options.db.type,  // Adjust as per your DB
                host: options.db.host,
                port: options.db.port,
                username: options.db.username,
                password: options.db.password,
                database: options.db.database,
                autoLoadEntities: options.db.autoLoadEntities,
                synchronize: true,  // For development only. Turn off for production.
            }),
        ];
        return {
            module: ChatModule,
            imports: imports,
            providers: [
                {
                    provide: 'CHAT_MODULE_OPTIONS',
                    useValue: options,
                },
            ],
        };
    }

    static forRootAsync(options: ChatModuleAsyncOptions): DynamicModule {
        const imports = [
            ...options.imports,
            TypeOrmModule.forRootAsync({
                useFactory: async (...args: any[]) => {
                    const chatOptions: ChatModuleOptions = await options.useFactory(...args);
                    return {
                        type: chatOptions.db.type,  // Adjust as per your DB
                        host: chatOptions.db.host,
                        port: chatOptions.db.port,
                        username: chatOptions.db.username,
                        password: chatOptions.db.password,
                        database: chatOptions.db.database,
                        autoLoadEntities: chatOptions.db.autoLoadEntities,
                        synchronize: chatOptions.db.synchronize,  // For development only. Turn off for production.
                    };
                },
                inject: options.inject || [],
                imports: options.imports || []
            })
        ];
        
        return {
            module: ChatModule,
            imports: imports,
            providers: [
                {
                    provide: 'CHAT_MODULE_OPTIONS',
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                ChatService
            ],
        };
    }
    
  
}