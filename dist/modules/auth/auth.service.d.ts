import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { AuthResponseDto, ProfileResponseDto } from './dto/auth-response.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private readonly configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<User | null>;
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(user: User): Promise<AuthResponseDto>;
    getProfile(userId: string): Promise<ProfileResponseDto>;
    validateToken(token: string): Promise<User | null>;
    private generateAuthResponse;
}
