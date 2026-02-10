import { ApiProperty } from '@nestjs/swagger';

class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'User email',
    example: 'admin@blog.com',
  })
  email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Admin',
  })
  name: string;

  @ApiProperty({
    description: 'Account creation date',
    example: '2026-01-25T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Account last update date',
    example: '2026-01-25T12:00:00.000Z',
  })
  updatedAt: Date;
}

export class AuthResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Token type',
    example: 'Bearer',
  })
  tokenType: string;

  @ApiProperty({
    description: 'Token expiration time',
    example: '7d',
  })
  expiresIn: string;

  @ApiProperty({
    description: 'User information',
    type: UserResponseDto,
  })
  user: UserResponseDto;
}

export class ProfileResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'User email',
    example: 'admin@blog.com',
  })
  email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Admin',
  })
  name: string;

  @ApiProperty({
    description: 'Account creation date',
    example: '2026-01-25T12:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Account last update date',
    example: '2026-01-25T12:00:00.000Z',
  })
  updatedAt: Date;
}

export class MessageResponseDto {
  @ApiProperty({
    description: 'Response message',
    example: 'Operation successful',
  })
  message: string;
}
