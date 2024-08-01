import { Module } from '@nestjs/common'
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Comment, CommentSchema } from './schemas/comment.schema'
import { EventsModule } from 'src/events/events.module'
import { EventsGateway } from 'src/events/events.gateway'
import { ClientsModule } from '@nestjs/microservices'
import { registerKafkaAsyncOptions } from 'src/app.config'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    ClientsModule.registerAsync(registerKafkaAsyncOptions()),
    EventsModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService, EventsGateway],
  exports: [CommentsModule]
})
export class CommentsModule {}
