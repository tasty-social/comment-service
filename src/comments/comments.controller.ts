import { Body, Controller, Delete, Get, Param, Post, Query, Req } from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { CommentsService } from './comments.service'
import { QueryFilterDto } from 'src/common/dto/query-filter.dto'
import { renderPagingResponse } from 'src/common/util/generatePaging'
import { EventsGateway } from 'src/events/events.gateway'
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger'

@Controller('comments')
@ApiTags('Comment')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly eventsGateway: EventsGateway
  ) {}

  @ApiBody({ type: CreateCommentDto })
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Req() req: any) {
    const authorId = req.user._id
    const commentCreated = await this.commentsService.create(createCommentDto, authorId)
    this.eventsGateway.emitNewComment(commentCreated)
    return commentCreated
  }

  @ApiQuery({ type: QueryFilterDto })
  @Get('post/:id')
  async getCommentByPostId(@Param('id') postId: string, @Query() query: QueryFilterDto) {
    const [res, total] = await this.commentsService.findByPost(postId, query)
    const paging = renderPagingResponse(query.limit, query.page, total)

    return { data: res, paging }
  }

  @Get(':id')
  async getCommentById(@Param('id') commentId: string) {
    return await this.commentsService.findOne(commentId)
  }

  @Delete(':id')
  async delete(@Param('id') commentId: string, @Req() req: any) {
    return await this.commentsService.delete(commentId, req.user._id)
  }
}
