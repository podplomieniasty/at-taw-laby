import express from 'express';
import { config } from './config';
import Controller from "./interfaces/controller.interface";
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

class App {
   public app: express.Application;

   constructor(controllers: Controller[]) {
       this.app = express();
       this.initializeMiddlewares();
       this.initializeControllers(controllers);
       this.connectToDatabase();
   }

   private initializeControllers(controllers: Controller[]): void {
       controllers.forEach((controller) => {
           this.app.use('/', controller.router);
       });
   }

   public listen(): void {
       this.app.listen(config.port, () => {
           console.log(`App listening on the port ${config.port}`);
       });
   }

   private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
 }

    private async connectToDatabase(): Promise<void> {
        try {
            await mongoose.connect(config.databaseUrl);
            console.log('Connection with database established.');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
        }

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        })
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected.');
        });
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
        });
        process.on('SIGTERM', async () => {
            await mongoose.connection.close();
            console.log('MongoDB connection closed due to app termination');
            process.exit(0);
          });
         
    }
 
}
export default App;