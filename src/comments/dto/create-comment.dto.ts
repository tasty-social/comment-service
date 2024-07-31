import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCommentDto {
  @ApiProperty({ example: 'New comment' })
  @IsString()
  @IsNotEmpty()
  readonly content: string

  @ApiProperty({ example: '66a9d6aac92f7c59b0c57651' })
  @IsString()
  @IsNotEmpty()
  readonly postId: string
}
