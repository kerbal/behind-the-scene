import { API_TAGS } from '@/common/constants';
import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';
import { readFileSync } from 'fs';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(API_TAGS.PUBLIC)
@Controller('script')
export class ScriptController {
  constructor() {}

  @Get('/')
  getScript(@Res() res: any) {
    res.type('.js');
    const script = readFileSync(join(process.cwd(), './static/index.js'));
    res.send(script);
  }
}
