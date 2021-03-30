import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import './database';
import GlobalErrorHandling from './errors/GlobalErrorHandling';
import accountEventRoutes from './routes/accountevent.routes';
import assetRoutes from './routes/asset.routes';
import clientRoutes from './routes/client.routes';
import companyRoutes from './routes/company.routes';
import externalAccountRoutes from './routes/externalaccount.routes';
import operationRoutes from './routes/operation.routes';
import operationStatusRoutes from './routes/operationstatus.routes';

const server = express();

server.use(cors());
server.use(express.json());
server.use(accountEventRoutes);
server.use(assetRoutes);
server.use(clientRoutes);
server.use(companyRoutes);
server.use(externalAccountRoutes);
server.use(operationRoutes);
server.use(operationStatusRoutes);

server.use(GlobalErrorHandling);

server.listen(process.env.PORT, () => {
	console.log('Server is running on 3333!!!');
});
