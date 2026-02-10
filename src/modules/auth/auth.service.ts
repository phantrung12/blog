import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthResponseDto, ProfileResponseDto } from './dto/auth-response.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Validate user credentials for login
   */
  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const isValid = await this.usersService.validatePassword(
      password,
      user.password,
    );
    if (!isValid) {
      return null;
    }

    return user;
  }

  /**
   * Register a new user
   * Note: For single-user blog, we might want to restrict this after first user
   */
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create user
    const user = await this.usersService.create(
      registerDto.email,
      registerDto.password,
      registerDto.name,
    );

    // Generate token and return response
    return this.generateAuthResponse(user);
  }

  /**
   * Login user and return JWT token
   */
  async login(user: User): Promise<AuthResponseDto> {
    return this.generateAuthResponse(user);
  }

  /**
   * Get user profile by ID
   */
  async getProfile(userId: string): Promise<ProfileResponseDto> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  /**
   * Validate JWT token and return user
   */
  async validateToken(token: string): Promise<User | null> {
    try {
      const payload = this.jwtService.verify(token);
      return this.usersService.findById(payload.sub);
    } catch {
      return null;
    }
  }

  /**
   * Generate JWT token and auth response
   */
  private generateAuthResponse(user: User): AuthResponseDto {
    const payload = { sub: user.id, email: user.email };
    const expiresIn = this.configService.get<string>('jwt.expiresIn') || '7d';

    return {
      accessToken: this.jwtService.sign(payload),
      tokenType: 'Bearer',
      expiresIn,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
