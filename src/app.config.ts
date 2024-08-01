import { ConfigModule, ConfigService } from '@nestjs/config'
import { ClientsModuleAsyncOptions, Transport } from '@nestjs/microservices'

export const registerKafkaAsyncOptions = (): ClientsModuleAsyncOptions => {
  return [
    {
      imports: [ConfigModule],
      name: 'KAFKA_SERVICE',
      useFactory: (configService: ConfigService) => {
        return {
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>('projectId'),
              ssl: configService.get<boolean>('kafka.ssl'),
              brokers: configService.get<string[]>('kafka.brokers')
            },
            consumer: {
              groupId: `${configService.get<string>('projectId')}`
            }
          }
        }
      },
      inject: [ConfigService]
    }
  ]
}
