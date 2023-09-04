import { Body, Controller, Delete, Param, Post, UseGuards, HttpException, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { MessageService } from './messages.service';
import { ChatRequestUser } from '../auth/chat-auth.types';
import { GetMember } from '../decorators/get-user/get-user.decorator';
import { ChatJwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller({
    path: 'group_channels',
    version: '1',
  })
export class MessagesController {
    constructor(private readonly messagesService: MessageService) {}

    @UseGuards(ChatJwtAuthGuard)
    @Post(':channelId/messages')
    async createMessage(
        @Param('channelId') channelId: string,
        @Body() content: any,
        @GetMember() user: ChatRequestUser, // This gets the user from the JWT payload
        @Res() res: Response
    ) {
        try {
            const result = await this.messagesService.createMessage(channelId, content.content, user.userId);
            return res.status(HttpStatus.CREATED).send({ status: 'success', data: result });
        } catch (error) {
            throw new HttpException({
              status: "error",
              error: 'Failed to create message',
            }, HttpStatus.BAD_REQUEST, {
              cause: error
            });
        }
    }
  
    @UseGuards(ChatJwtAuthGuard)
    @Delete(':channelId/messages/:messageId')
    async deleteMessage(@Param('channelId') channelId: string, @Param('messageId') messageId: string, @Res() res: Response) {
        try {
            await this.messagesService.deleteMessage(messageId);
            return res.status(HttpStatus.OK).send({ status: 'success', message: 'Message deleted successfully' });
        } catch (error) {
            throw new HttpException({
              status: "error",
              error: 'Failed to delete message',
            }, HttpStatus.BAD_REQUEST, {
              cause: error
            });
        }
    }
}
