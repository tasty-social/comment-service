import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CommentsModule } from './comments/comments.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { EventsModule } from './events/events.module'
import { AuthModule } from './auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './auth/jwt.guard'
import { RolesGuard } from './auth/roles.guard'
import configuration from './config/configuration'
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration]
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    CommentsModule,
    EventsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },

    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {}
