import { DynamicModule, Module, Global } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MessageModule } from './messages/messages.module';
import { BotsModule } from './bots/bots.module';
import { GroupChannelsModule } from './group-channels/group-channels.module';
import { ChatModuleOptions } from './chat.types';

export interface ChatModuleAsyncOptions {
  useFactory: (...args: any[]) => Promise<ChatModuleOptions> | ChatModuleOptions;
  inject?: any[];
  imports: any[];
}


@Global()
@Module({})
export class ChatModule {
    static forRoot(options: ChatModuleOptions): DynamicModule {
        return {
            module: ChatModule,
            imports: [MessageModule, GroupChannelsModule, BotsModule],
            providers: [
                {
                    provide: 'CHAT_MODULE_OPTIONS',
                    useValue: options,
                },
                ChatService,
            ],
            controllers: [ChatController],
            exports: [ChatService],
        };
    }

    static forRootAsync(options: ChatModuleAsyncOptions): DynamicModule {
      return {
          module: ChatModule,
          imports: [...options.imports], // Include the imports from options
          providers: [
              {
                  provide: 'CHAT_MODULE_OPTIONS',
                  useFactory: options.useFactory,
                  inject: options.inject || [],
              },
              ChatService,
          ],
          controllers: [ChatController],
          exports: [ChatService],
      };
  }
  
}