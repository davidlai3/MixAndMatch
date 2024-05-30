import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { router as authRouter } from '../config/auth.js'
import { router as apiRouter } from './routes.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

mongoose.connect('mongodb+srv://davidlai3:sdfghj45@cluster0.3eutqra.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
	useNewUrlParser: true,
	useUnifiedTopology: true 
});


app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', '../../frontend/index.html'));
})

app.use( express.json( {extended: false } ));
app.use(authRouter);
app.use(apiRouter);

app.listen(3000, () => {
	console.log('Server listening on port 3000');
});
