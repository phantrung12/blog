import {
  Controller,
  Post,
  Get,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards';
import { Public } from '../../common/decorators';
import {
  LoginDto,
  RegisterDto,
  AuthResponseDto,
  ProfileResponseDto,
} from './dto';
import { User } from '../users/entities/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/register
   * Register a new user account
   */
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user account' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({
    status: 409,
    description: 'User with this email already exists',
  })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  /**
   * POST /auth/login
   * Login with email and password
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Request() req: RequestWithUser): Promise<AuthResponseDto> {
    return this.authService.login(req.user);
  }

  /**
   * GET /auth/me
   * Get current authenticated user information
   */
  @Get('me')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current authenticated user' })
  @ApiResponse({
    status: 200,
    description: 'Current user information',
    type: ProfileResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async me(@Request() req: RequestWithUser): Promise<ProfileResponseDto> {
    return this.authService.getProfile(req.user.id);
  }

  /**
   * GET /auth/profile
   * Get current user profile (alias for /me)
   */
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile',
    type: ProfileResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(
    @Request() req: RequestWithUser,
  ): Promise<ProfileResponseDto> {
    return this.authService.getProfile(req.user.id);
  }

  /**
   * POST /auth/logout
   * Logout (client-side token removal, server can log the event)
   */
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Logout current user' })
  @ApiResponse({
    status: 200,
    description: 'Logout successful',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logout(): Promise<{ message: string }> {
    // JWT is stateless, so logout is handled client-side
    // Server can log the event or blacklist token if needed
    return { message: 'Logged out successfully' };
  }

  /**
   * POST /auth/refresh
   * Refresh access token (placeholder for future implementation)
   */
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refreshToken(
    @Request() req: RequestWithUser,
  ): Promise<AuthResponseDto> {
    // Re-generate token for the authenticated user
    return this.authService.login(req.user);
  }
}
