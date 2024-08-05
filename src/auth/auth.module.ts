import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtAuthGuard } from './guards/jwt.guards';
import { LocalGuard } from './guards/local.guards';
import { RolesGuard } from './guards/roles.guards';

@Module({
  imports: [
    forwardRef(() => UsersModule), 
    JwtModule.register({
      secret: 'jwttoken',
      signOptions: { expiresIn: '1h' },
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, JwtAuthGuard, LocalGuard, RolesGuard],
  exports: [AuthService],
})
export class AuthModule {}
