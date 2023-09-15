import { Controller, UseGuards} from '@nestjs/common';
import { ChatJwtAuthGuard } from './jwt-auth.guard';

@Controller({
  path: 'auth',
  version: '1',
})

@UseGuards(ChatJwtAuthGuard)
export class ChatAuthController {
  constructor(
    ) {}
  
}
