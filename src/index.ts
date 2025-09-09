import express from 'express';

const app = express();
const PORT = 3000;

app.get('/api/weather', async (req: any, res: any) => {
  return res.json({ temperature: 25, condition: 'Sunny' });
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
