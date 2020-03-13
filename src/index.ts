import express from 'express';
import helmet from 'helmet';

const app = express();
const port = 3030 || process.env.PORT;

app.use(helmet());

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Starting server on localhost:${port}`);
});
