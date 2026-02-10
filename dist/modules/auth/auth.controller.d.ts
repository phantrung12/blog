import { AuthService } from './auth.service';
import { RegisterDto, AuthResponseDto, ProfileResponseDto } from './dto';
import { User } from '../users/entities/user.entity';
interface RequestWithUser extends Request {
    user: User;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<AuthResponseDto>;
    login(req: RequestWithUser): Promise<AuthResponseDto>;
    me(req: RequestWithUser): Promise<ProfileResponseDto>;
    getProfile(req: RequestWithUser): Promise<ProfileResponseDto>;
    logout(): Promise<{
        message: string;
    }>;
    refreshToken(req: RequestWithUser): Promise<AuthResponseDto>;
}
export {};
