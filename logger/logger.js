import winston from 'winston';

export const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: './logs/access.log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:dd',
        }),
        winston.format.simple()
      ),
    }),
  ],
});
