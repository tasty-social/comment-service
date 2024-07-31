import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Comment, CommentDocument } from './schemas/comment.schema'
import { Model, Types } from 'mongoose'
import { CreateCommentDto } from './dto/create-comment.dto'
import { QueryFilterDto } from 'src/common/dto/query-filter.dto'

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>) {}

  async create(createCommentDto: CreateCommentDto, authorId: string) {
    const createdComment = new this.commentModel({
      createCommentDto,
      postId: new Types.ObjectId(createCommentDto.postId),
      author: new Types.ObjectId(authorId)
    })

    return await createdComment.save()
  }

  async findOne(commentId: string) {
    const comment = await this.commentModel.findById(commentId).exec()
    if (!comment) {
      throw new NotFoundException(`Comment ${commentId} not found`)
    }

    return comment
  }

  async findByPost(postId: string, query: QueryFilterDto) {
    const { page = 1, limit = 10 } = query
    const skip = (page - 1) * limit

    const comments = await this.commentModel.find({ postId }).skip(skip).limit(limit).exec()
    const total = await this.commentModel.countDocuments().exec()

    return [comments, total]
  }

  async findChildComments(parentCommentId: string): Promise<Comment[]> {
    return this.commentModel.find({ parentComment: new Types.ObjectId(parentCommentId) }).exec()
  }

  async update() {
    // TODO: handle update comment
  }

  async delete(commentId: string, userId: string) {
    const commentExisted = await this.findOne(commentId)
    if (!commentExisted) {
      throw new NotFoundException(`Comment ${commentId} not found`)
    }

    if (!commentExisted.authorId.equals(new Types.ObjectId(userId))) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }

    return this.commentModel.findByIdAndDelete(commentId).exec()
  }
}
