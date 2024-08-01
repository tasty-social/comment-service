import { SetMetadata } from '@nestjs/common'

export const PUBLIC_META_KEY = 'isPublic'
export const Public = () => SetMetadata(PUBLIC_META_KEY, true)
