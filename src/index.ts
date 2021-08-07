import express from 'express';
import morgan from 'morgan';
import routes from './routes';

const app = express();
const port = 9000;

app.use(morgan('dev'));

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
