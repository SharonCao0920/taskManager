import winston, {transports, format} from "winston";
import {DateTime} from "luxon";

const loggerLevel = ['info', 'debug','error', 'warn']

const logFormat = format.printf(({level, message}) => {
    const timestamp = DateTime.local().toUTC();
    return `time: ${timestamp} \nlevel: ${level}\nmessage: ${message}`
})

export const getLoggerInstance = () => {

    const logger = winston.createLogger({
        level: 'info',  
        format: format.json(),
        transports: [
            new transports.Console({format:format.combine(format.colorize(), logFormat)}),
        ]
    });
    return logger;

}











//     const winston = require('winston');

// const logger = winston.createLogger({
//   level: 'info',
//   format: winston.format.json(),
//   defaultMeta: { service: 'user-service' },
//   transports: [
//     //
//     // - Write all logs with importance level of `error` or less to `error.log`
//     // - Write all logs with importance level of `info` or less to `combined.log`
//     //
//     new winston.transports.File({ filename: 'error.log', level: 'error' }),
//     new winston.transports.File({ filename: 'combined.log' }),
//   ],
// });

// //
// // If we're not in production then log to the `console` with the format:
// // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// //
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple(),
//   }));
// }


// }