import 'dotenv/config';
import './config/db.js';
import express from 'express';
import routineRouter from './routers/routines.js';
import userRouter from './routers/users.js';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, (err) => {
  console.log(
    err
      ? `Error launching server: ${err.message}`
      : `Server running on port http://127.0.0.1:${PORT}\n
      Ctrol + c to exit...`
  );
});

app.use('/api/v1/routines', routineRouter);
app.use('/api/v1/auth', userRouter);
