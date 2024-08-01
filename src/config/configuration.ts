export default () => ({
  env: process.env.NODE_ENV || 'development',
  projectId: process.env.PROJECT_ID || 'comment-service-v1',

  //server port and ip address
  port: parseInt(process.env.PORT, 10) || 3003,
  ip: process.env.IP || '0.0.0.0',

  kafka: {
    ssl: process.env.KAFKA_USE_SSL === 'true',
    brokers: (process.env.KAFKA_BROKERS || 'kafka:9092').split(',')
  },

  //JWT
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY || '__SECRET_KEY_GOES_HERE__',
    ttl: process.env.JWT_TTL || 2592000 // 30 days
  }
})
