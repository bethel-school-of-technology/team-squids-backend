import express, { NextFunction, Request, Response } from 'express'


const app = express();

function helloWorld(req: Request, res: Response, next: NextFunction){
  res.send('Hello World')
}

app.use('/', helloWorld);

app.listen(3000);