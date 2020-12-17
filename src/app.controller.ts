import { Controller, Get } from '@nestjs/common';
import { homedir } from 'os';

@Controller('')
export class AppController {
  @Get()
  home() {
    return 'welcome to my site';
  }
}
