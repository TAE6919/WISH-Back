import express from 'express';
import swaggerUi from 'swagger-ui-express';
import yamljs from 'yamljs';
import postingsRouter from './routers/postingsRouter.js';
import usersRouter from './routers/usersRouter.js';
import db from './db.js';
const app = express();
const PORT = 4000;
const swaggerDocument = yamljs.load('./api/api.yaml');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//middle ware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/postings', postingsRouter);
app.use('/api/users', usersRouter);

const handleListening = () => {
  console.log(`Server listening on port http://localhost:${PORT}😀`);
};

app.listen(PORT, handleListening);
