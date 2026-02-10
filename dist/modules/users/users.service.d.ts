import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    create(email: string, password: string, name: string): Promise<User>;
    validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean>;
    updatePassword(userId: string, newPassword: string): Promise<void>;
    updateProfile(userId: string, data: {
        name?: string;
        email?: string;
    }): Promise<User | null>;
}
