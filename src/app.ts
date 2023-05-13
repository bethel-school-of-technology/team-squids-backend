import express, { NextFunction, Request, Response } from 'express';
import { db } from './modules';
import eventRoutes from './routes/eventRoutes'
import churchRoutes from './routes/churchRoutes'

const app = express();

app.use(express.json())

function helloWorld(req: Request, res: Response, next: NextFunction){
  res.send('Hello World')
}

app.use('/api/events', eventRoutes)
app.use('/api/church', churchRoutes)
app.use('/', helloWorld);

db.sync({ alter:true }).then(() => {
  console.info("Connected to the database!")
});


app.listen(3000);