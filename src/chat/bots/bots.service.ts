import { Injectable } from '@nestjs/common';

@Injectable()
export class BotsService {

  sendBotMessage(botMemberId: string, messageContent: any): any {
    // Logic to send a message to the bot with the given botMemberId goes here

    // For demonstration purposes:
    console.log(`Sending message to bot with ID: ${botMemberId}`);
    console.log(messageContent);

    // Return a mock response for now:
    return { success: true, message: 'Message sent to bot successfully.' };
  }
}
