import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class QueryFilterDto {
  @ApiProperty({ example: 'txt example' })
  @IsString()
  @IsOptional()
  searchTxt?: string

  @ApiProperty({ example: 10 })
  @IsString()
  @IsOptional()
  limit?: number

  @ApiProperty({ example: 1 })
  @IsString()
  @IsOptional()
  page?: number
}
