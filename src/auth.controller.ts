import {
  Body,
  Post,
  Route,
  Tags,
  SuccessResponse,
  Controller,
  Res,
  TsoaResponse,
} from 'tsoa';
import { AppDataSource, User } from './models';
import { hashPassword, comparePassword, generateToken } from './utils';
import { Equal } from 'typeorm';

export interface UserRegistrationInput {
  username: string;
  email: string;
  password: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: { id: number; username: string; email: string };
  token: string;
}

export interface UserPublicProfile {
  id: number;
  username: string;
  email: string;
}

@Route('auth')
@Tags('Authentication')
export class AuthController extends Controller {
  // @SuccessResponse(201, 'User Created')
  // @Post('register')
  // public async register(
  //   @Body() body: UserRegistrationInput,
  //   @Res() badRequest: TsoaResponse<400, { message: string }>,
  //   @Res() conflict: TsoaResponse<409, { message: string }>,
  // ): Promise<UserPublicProfile> {
  //   const repo = AppDataSource.getRepository(User);

  //   const existing = await repo.findOne({
  //     where: [{ email: Equal(body.email) }, { username: Equal(body.username) }],
  //   });

  //   if (existing) {
  //     if (existing.email === body.email) {
  //       return conflict(409, { message: 'Email already in use' });
  //     }
  //     if (existing.username === body.username) {
  //       return conflict(409, { message: 'Username already taken' });
  //     }
  //   }

  //   const hashed = await hashPassword(body.password);
  //   const user = repo.create({
  //     username: body.username,
  //     email: body.email,
  //     passwordHash: hashed,
  //   });

  //   try {
  //     const saved = await repo.save(user);
  //     this.setStatus(201);
  //     return {
  //       id: saved.id,
  //       username: saved.username,
  //       email: saved.email,
  //     };
  //   } catch (err) {
  //     return badRequest(400, { message: 'User registration failed' });
  //   }
  // }

  // @Post('login')
  // public async login(
  //   @Body() body: UserLoginInput,
  //   @Res() unauthorized: TsoaResponse<401, { message: string }>,
  // ): Promise<AuthResponse> {
  //   const user = await AppDataSource.getRepository(User).findOneBy({
  //     email: body.email,
  //   });

  //   if (!user || !(await comparePassword(body.password, user.passwordHash))) {
  //     return unauthorized(401, { message: 'Invalid email or password' });
  //   }

  //   const token = generateToken({ userId: user.id, username: user.username });
  //   return {
  //     user: {
  //       id: user.id,
  //       username: user.username,
  //       email: user.email,
  //     },
  //     token,
  //   };
  // }
}
