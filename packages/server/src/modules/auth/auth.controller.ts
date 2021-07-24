import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Query,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { API_TAGS } from '@/common/constants/api.enum';
import { CreateUserDTO } from '../users/dto/user.class';
import { AuthService } from './auth.service';
import { AuthGithubDTO } from './dto/github.class';
import { LoginUserPipe } from './pipe/loginUser.pipe';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JWTPayload } from './dto/jwt.class';

@ApiTags(API_TAGS.AUTH)
@Controller(API_TAGS.AUTH)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('github/token')
  @ApiQuery({ name: 'state', type: String, required: false })
  @ApiQuery({ name: 'code', type: String })
  async getToken(@Query() query: { state: string; code: string }) {
    const { state, code } = query;
    return await this.authService.getGithubToken(code, state);
  }

  @Post()
  async authJWT(@Body(new LoginUserPipe()) loginUserDTO: CreateUserDTO) {
    const user = await this.authService.verifyUser(loginUserDTO);
    if (!user) throw new BadRequestException();
    return await this.authService.sign(user);
  }

  @Get('token')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async checkToken(@Request() req: { user: JWTPayload }) {
    return req.user;
  }

  @Post('token')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Request() req: { user: JWTPayload }) {
    return await this.authService.refresh(req.user);
  }

  @Post('github')
  async authGithub(@Body() body: AuthGithubDTO) {
    const { code, state } = body;
    if (!code) throw new BadRequestException();
    const data = await this.authService.getGithubToken(code, state);
    if (data.error) throw new BadRequestException();
    const githubUser = await this.authService.getUserInfo(
      data.access_token,
      data.token_type,
    );
    if (!githubUser) throw new BadRequestException();
    const user = await this.authService.verifyUser({
      email: githubUser.email,
      githubId: githubUser.id.toString(),
      displayName: githubUser.name,
    });
    if (!user) throw new BadRequestException();
    return await this.authService.sign(user);
  }
}
