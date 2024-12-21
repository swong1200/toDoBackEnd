import express from 'express';
import cors from "cors";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

const PORT = 8000;

app.use(express.json());
app.use(cors());

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
  console.log(task);
  res.json(task);
});

app.put('/edit/:id', async (req: any, res: any) => {
  const id = Number(req.params.id);
  const { title, color, completed } = req.body;
  const editTask = await prisma.task.update({
    where: { id },
    data: {
      title,
      color,
      completed,
    },
  });
  res.json(editTask);
});

app.delete('/task/:id', async (req: any, res: any)=> {
    const id = Number(req.params.id);
    const task = await prisma.task.delete({
        where: { id }
    })
    res.json(task)
})
// End of routes

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
