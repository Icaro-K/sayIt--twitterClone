import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './schema/users.schema';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshToken } from './schema/refresh-token.schema';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
  ) {}

  async signUp(signupData: SignupDto) {
    const { email, password, username, name } = signupData;

    const emailExists = await this.userModel.findOne({ email });
    if (emailExists) throw new ConflictException('Email já cadastrado');

    const usernameExists = await this.userModel.findOne({ username });
    if (usernameExists) throw new ConflictException('Username já cadastrado');

    const hashPassword = await bcrypt.hash(password, 10);

    await this.userModel.create({
      name,
      email,
      username,
      password: hashPassword,
    });
  }

  async login(credendials: LoginDto) {
    const { email, password } = credendials;

    const user = await this.userModel.findOne({ email });
    if (!user) throw new UnauthorizedException('Email ou senha inválidos');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException('Email ou senha inválidos');

    return this.generateToken(user._id);
  }

  async refreshToken(refreshToken: string) {
    const token = await this.refreshTokenModel.findOne({ token: refreshToken });
    if (!token) throw new UnauthorizedException('Refresh token inválido');

    if (token.expiresAt < new Date()) {
      await this.refreshTokenModel.deleteOne({ _id: token._id });
      throw new UnauthorizedException('Refresh token expirado');
    }
    
    return this.generateToken(token.userId);
  }

  async generateToken(userId: Types.ObjectId) {
    const accessToken = this.jwtService.sign({ userId });
    const refreshToken = uuidv4();

    await this.storeRefreshToken(userId, refreshToken);
    return { accessToken, refreshToken };
  }

  async storeRefreshToken(userId: Types.ObjectId, token: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.refreshTokenModel.findOneAndUpdate(
      { userId },
      { token, expiresAt },
      { upsert: true },
    );
  }
}
