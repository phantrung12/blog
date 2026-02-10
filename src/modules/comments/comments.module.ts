import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), forwardRef(() => PostsModule)],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
