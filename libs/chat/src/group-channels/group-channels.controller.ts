import { Body, Controller, Delete, Param, Post, UseGuards, HttpException, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { GroupChannelsService } from './group-channels.service';
import { ChatJwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller({
  path: 'group_channels',
  version: '1',
})
export class GroupChannelsController {
    constructor(
      private readonly groupChannelsService: GroupChannelsService
      ) {}

    @UseGuards(ChatJwtAuthGuard)
    @Post()
    async createGroupChannel(
        @Body() createChannelDto: { title: string; isPublic: boolean; password?: string },
        @Res() res: Response
    ) {
        try {
            const result = await this.groupChannelsService.createGroupChannel(
                createChannelDto.title, 
                createChannelDto.isPublic, 
                createChannelDto.password
            );
            return res.status(HttpStatus.CREATED).send({ status: 'success', data: result });
        } catch (error) {
            throw new HttpException({
              status: "error",
              error: 'Failed to create group channel',
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
