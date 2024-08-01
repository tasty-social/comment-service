import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from './jwt.strategy'
import { RolesGuard } from './roles.guard'
import { JwtAuthGuard } from './jwt.guard'

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secretKey'),
        signOptions: { expiresIn: configService.get<string>('jwt.ttl') }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [JwtStrategy, RolesGuard, JwtAuthGuard],
  exports: [JwtModule]
})
export class AuthModule {}
