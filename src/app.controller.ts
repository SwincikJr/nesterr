import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  
  @Get('healthz')
  healthz(): string {
    return `up and running!`;
  }
}
