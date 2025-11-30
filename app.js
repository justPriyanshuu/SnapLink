import express from 'express';
import userRouter from './routes/auth.routes.js';

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.get('/', (req, res) => res.send('OK'));

app.use('/auth', userRouter);

app.listen(PORT, () => {
  console.log(`Server up and running on Port:${PORT}`);
});
