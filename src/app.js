import express from 'express';
import helmet from 'helmet';

//rutas del proyecto
import PostRouter from './routes/posts.routes.js';

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(helmet());

app.disable('x-powered-by');

app.use("/api", PostRouter);

/*=======================================================================================*/
// =====================custom 404
app.use((req, res, next) => {
    let response = `
        <div>El recurso no fue encontrado y no es mi culpa.</div>
    `;

    res.status(404).send(response)
  })
  
  // ===============custom error handler
  app.use((err, req, res, next) => {
    let response = `
        <div>El servidor esta bien Larry y no es mi culpa.</div>
    `;
    res.status(500).send(response)
  })

/*=======================================================================================*/

export default app;