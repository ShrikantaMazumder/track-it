import expressWinston from "express-winston";
import winston from "winston";
import "winston-daily-rotate-file";
import { ElasticsearchTransport } from 'winston-elasticsearch';
import 'winston-mongodb';
import { uri } from './mongo';


const getMessage = (req, res) => {
    let obj = {
      correlationId: req.headers["x-correlation-id"],
      requestBody: req.body,
    };
    return JSON.stringify(obj);
  };
  
  // ALL REQUEST LOG ON FILE
  // const fileInfoLogger = new winston.transports.DailyRotateFile({
  //   filename: "log-info-%DATE%.log",
  //   datePattern: "YYYY-MM-DD-HH",
  //   zippedArchive: true,
  //   maxSize: "20m",
  //   maxFiles: "14d",
  // });
  
  // Elastic Search jobs
  const esTransportOpts = {
    level: 'info',
    clientOpts: {node: 'http://localhost:9200'},
    indexPrefix: 'log-track-it'
  };
  const esTransport = new ElasticsearchTransport(esTransportOpts);
  
  // Info logger
  export const infoLogger = expressWinston.logger({
    transports: [new winston.transports.Console(),
      esTransport,
      //  fileInfoLogger,
      ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: getMessage,
  });
  
  // ALL ERROR LOG ON FILE
  // const fileErrorLogger = new winston.transports.DailyRotateFile({
  //   filename: "log-error-%DATE%.log",
  //   datePattern: "YYYY-MM-DD-HH",
  //   zippedArchive: true,
  //   maxSize: "20m",
  //   maxFiles: "14d",
  // });
  
  // log error on mongo
  const mongoErrorLogger = new winston.transports.MongoDB({
    db: uri,
    metaKey: 'meta'
  })
  
  // create error logger
  export const errorLogger = expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
      // fileErrorLogger,
      mongoErrorLogger,
      esTransport,
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    )
  });
  