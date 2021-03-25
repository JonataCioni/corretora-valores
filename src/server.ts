import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './database';
import GlobalErrorHandling from './errors/GlobalErrorHandling';

const server = express();

server.use(cors());
server.use(express.json());

server.use(GlobalErrorHandling);

server.listen(process.env.PORT, () => {
	console.log('Server is running on 3333!!!');
});
