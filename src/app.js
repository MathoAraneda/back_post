import express from 'express';
import helmet from 'helmet';
import cors from "cors";


import { ORIGIN_CORS } from "./config.js";

//rutas del proyecto
import PostRouter from './routes/posts.routes.js';

const app = express();

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(helmet());

const allowedOrigins = ORIGIN_CORS();
app.use(    
  cors({
    origin: function (origin, callback) {
        console.log("origin=>", origin);
        if (!origin || allowedOrigins.includes(origin)) return callback(null, origin);
        else return callback("Error de CORS origin: " + origin + " No autorizado!");
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
})
);

app.disable('x-powered-by');

app.use("/api", PostRouter);

/*=======================================================================================*/
// =====================custom 404
app.use((req, res, next) => {
    let response = `
        <div>El recurso no fue encontrado</div>
    `;

    res.status(404).send(response)
  })
  
  // ===============custom error handler
  app.use((err, req, res, next) => {
    let response = `
        <div>El servidor esta off.</div>
    `;
    res.status(500).send(response)
  })

/*=======================================================================================*/

export default app;