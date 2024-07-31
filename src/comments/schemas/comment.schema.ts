import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export type CommentDocument = Comment & Document

@Schema()
export class Comment extends Document {
  @Prop({ required: true })
  content: string

  @Prop({ required: true })
  authorId: Types.ObjectId

  @Prop({ required: true })
  postId: Types.ObjectId

  @Prop({ type: Types.ObjectId, ref: 'Comment' })
  parentComment?: Types.ObjectId

  @Prop({ type: [Types.ObjectId], ref: 'Comment', default: [] })
  childComments: Types.ObjectId[]

  @Prop({ default: Date.now })
  createdAt: Date

  @Prop({ default: null })
  updatedAt: Date
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
