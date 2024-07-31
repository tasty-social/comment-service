import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentsModule } from './comments/comments.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [CommentsModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
