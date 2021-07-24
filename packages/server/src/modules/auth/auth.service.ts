import { GithubTokenResponse, GithubUser } from '@/common/classes/github.class';
import { HttpService, Injectable } from '@nestjs/common';
import { AppService } from '../shared/services/app.service';
import { CreateUserDTO } from '../users/dto/user.class';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../users/schema/user.schema';
import { JWTPayload, JWTResponse } from './dto/jwt.class';

@Injectable()
export class AuthService {
  private githubConfig: {
    clientId: string;
    clientSecret: string;
    tokenUrl: string;
  };

  private JWTConfig: {
    expiresIn: number;
  };

  constructor(
    private userService: UsersService,
    private httpService: HttpService,
    private appService: AppService,
    private jwtService: JwtService,
  ) {
    this.githubConfig = this.appService.getGithubConfig();
    this.JWTConfig = this.appService.getJWTConfig();
  }
  async verifyUser(loginUserDTO: CreateUserDTO) {
    return this.userService.verifyUser(loginUserDTO);
  }

  async getGithubToken(
    code: string,
    state: string,
  ): Promise<GithubTokenResponse> {
    const {
      clientId: client_id,
      clientSecret: client_secret,
      tokenUrl,
    } = this.githubConfig;
    const res = await this.httpService
      .post(
        tokenUrl,
        {
          client_id,
          client_secret,
          code,
          state,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      .toPromise();
    return res.data;
  }

  async getUserInfo(
    token: string,
    type: string = 'Bearer',
  ): Promise<GithubUser> {
    const res = await this.httpService
      .get('https://api.github.com/user', {
        headers: {
          Authorization: `${type} ${token}`,
        },
      })
      .toPromise();
    return res.status === 200 ? res.data : null;
  }

  async sign(user: UserDocument): Promise<JWTResponse> {
    const payload: JWTPayload = {
      id: user._id,
      email: user.email,
    };
    const { expiresIn } = this.JWTConfig;
    const iat = new Date().getTime();
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      expiresIn,
      expiresAt: iat + expiresIn * 1000,
    };
  }

  async refresh(payload: JWTPayload): Promise<JWTResponse> {
    const { expiresIn } = this.JWTConfig;
    const iat = new Date().getTime();
    const accessToken = this.jwtService.sign(payload);
    return {
      accessToken,
      expiresIn,
      expiresAt: iat + expiresIn * 1000,
    };
  }
}
