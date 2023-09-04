import { Body, Controller, Param, Post, UseGuards, HttpException, HttpStatus, Res } from '@nestjs/common';
import { BotsService } from './bots.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ChatJwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller({
  path: 'bots',
  version: '1',
})
export class BotsController {
    constructor(private readonly botsService: BotsService) {}

    // ... Other bot-specific endpoints ...
  
    @UseGuards(ChatJwtAuthGuard)
    @Post(':botId/messages')
    async sendBotMessage(@Param('botId') botId: string, @Body() content: any, @Res() res: Response) {
      try {
        const result = await this.botsService.sendBotMessage(content, botId);
        return res.status(HttpStatus.CREATED).send({ status: 'success', data: result });
      } catch (error) {
        throw new HttpException({
          status: "error",
          error: 'Failed to send bot message',
        }, HttpStatus.BAD_REQUEST, {
          cause: error
        });
      }
    }
  
    // Do not provide a delete endpoint for bot messages here
}
