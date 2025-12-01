import express from 'express';
import 'dotenv/config';
import userRouter from './routes/auth.routes.js';
import urlRouter from './routes/url.routes.js';

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.get('/', (req, res) => res.send('OK'));

app.use('/auth', userRouter);
app.use(urlRouter);

app.listen(PORT, () => {
  console.log(`Server up and running on Port:${PORT}`);
});
