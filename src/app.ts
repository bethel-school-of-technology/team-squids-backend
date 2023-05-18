import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import { db } from './models';
import churchRoutes from './routes/churchRoutes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// incoming requests
const cors = require('cors');
app.use(cors());

// Routing Middleware
app.use('/api/church',churchRoutes);

app.use(( req: Request, res: Response, next: NextFunction ) => {
  res.status(404).send("This is not the URL you are looking for!");
})

// function helloWorld(req: Request, res: Response, next: NextFunction){
//   res.send('Hello World')
// }

// app.use('/', helloWorld);


// Syncing DB
db.sync({ alter:true }).then(() => {
  console.info("Connected to the database!")
});


app.listen(3000);