import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../posts/entities/post.entity';
import { Page } from '../pages/entities/page.entity';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Page])],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
