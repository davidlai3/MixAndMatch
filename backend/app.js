import express from 'express';
import cors from 'cors'
import { router as authRouter } from '../config/auth.js'
import { router as apiRouter } from './routes.js';

const app = express();

app.use(cors());
app.use(express.json( {extended: false } ));
app.use(authRouter);
app.use(apiRouter);

app.listen(3001, () => {
	console.log('Server listening on port 3001');
});
