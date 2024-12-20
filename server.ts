import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.get('/', async (req: any, res: any) => {
  const tasks = await prisma.task.findMany();
  console.log(tasks);
  res.json(tasks);
});

app.post('/task', async (req: any, res: any) => {
  const { title, color } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      color,
    },
  });
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
