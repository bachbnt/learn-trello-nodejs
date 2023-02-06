import RoutePath from '@constants/routePath';
import Config from '@core/config';
import database from '@database/database';
import logger from '@middleware/logger';
import authRouter from '@routers/authRouter';
import homeRouter from '@routers/homeRouter';
import issueRouter from '@routers/issueRouter';
import projectRouter from '@routers/projectRouter';
import userRouter from '@routers/userRouter';
import chalk from 'chalk';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import http from 'http';
import path from 'path';

const app = express();

app.use(cors());
app.use(logger());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(RoutePath.HOME, homeRouter);
app.use(RoutePath.AUTH, authRouter);
app.use(RoutePath.USER, userRouter);
app.use(RoutePath.PROJECT, projectRouter);
app.use(RoutePath.ISSUE, issueRouter);

app.set('port', Config.PORT);

const server = http.createServer(app);
server.listen(Config.PORT);
server.on('listening', () => {
  console.log(chalk.green('Server is connected'));
  console.log(chalk.yellow(`${Config.HOST}:${Config.PORT}`));
});
server.on('error', (error: any) => {
  console.error(error);
});

database
  .connect()
  .then(() => {
    console.log(chalk.green('Database is connected'));
  })
  .catch((error: any) => {
    console.error(error);
  });
