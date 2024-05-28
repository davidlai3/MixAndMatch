import express from 'express';
import mongoose from 'mongoose';
import { router as authRouter } from './auth.js';
import { router as apiRouter } from './routes.js';

const app = express();

mongoose.connect('mongodb+srv://davidlai3:sdfghj45@cluster0.3eutqra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
	useNewUrlParser: true,
	useUnifiedTopology: true 
});


app.use(authRouter);
app.use(apiRouter);

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
