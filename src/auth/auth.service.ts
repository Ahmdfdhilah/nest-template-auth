import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthPayloadDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { CreateUserDtoType } from 'src/users/dto/create-user.dto';
import { UpdateUserDtoType } from 'src/users/dto/update-user.dto';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) { }

  decodeToken(token: string): any {
    try {
      return this.jwtService.decode(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  getUserIdFromToken(token: string): string {
    const decodedToken = this.decodeToken(token);
    return decodedToken?.sub;
  }

  async getUserRole(userId: string): Promise<string> {
    try {
      const user = await this.userService.findOne(userId);
      return user.role;
    } catch (error) {
      console.error('Error fetching user role:', error);
      throw new UnauthorizedException('Failed to fetch user role');
    }
  }

  async validateUser({ email, password }: AuthPayloadDto): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      this.logger.log(`User not found: ${email}`);
      return null;
    }

    if (await bcrypt.compare(password, user.password)) {
      return {
        ...user,
        password: undefined,
      };
    }

    this.logger.log("Password comparison failed");
    return null;
  }

  getJwtToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async createUser(createUserDto: CreateUserDtoType): Promise<any> {
    const { email, password, ...userData } = createUserDto;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      if (existingUser.email === email) {
        throw new ConflictException('Email already exists');
      } 
    }

    const confirmationToken = randomBytes(20).toString('hex');

    const user = await this.userService.create({
      ...userData,
      email,
      password
    });


    return { user };
  }

  
  async updateUser(id: string, updateUserDto: UpdateUserDtoType): Promise<any> {
    const {  email, ...updateData } = updateUserDto;
    const existingUser = await this.userService.findByEmail(email);

    if (existingUser && existingUser.id !== id) {
      if (existingUser.email === email) {
        throw new ConflictException('Email already exists');
      }
    }
    const updateUserData = {...updateData, email}
    const user = await this.userService.update(id, updateUserData);
    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { user, accessToken };
  }
}
