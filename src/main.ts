import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { HttpExceptionFilter } from './common/error/http-exception.filter'
import { ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { TransformInterceptor } from './common/transform/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(new ValidationPipe())
  app.setGlobalPrefix('api/v1')
  const config = new DocumentBuilder()
    .setTitle('Comment Service API')
    .setDescription('The Comment service API description')
    .setVersion('1.0')
    .addTag('comment')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  await app.startAllMicroservices()
  await app.listen(3003)
}
bootstrap()
