import express from 'express';

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hey Chat' });
});

app.listen(PORT, () => {
  console.log(`Server up and running on Port:${PORT}`);
});