import express, { NextFunction, Request, Response } from 'express';
import { db } from './module';

const app = express();

function helloWorld(req: Request, res: Response, next: NextFunction){
  res.send('Hello World')
}

app.use('/', helloWorld);



db.sync({ alter:true }).then(() => {
  console.info("Connected to the database!")
});


app.listen(3000);