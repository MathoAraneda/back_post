import { Op as Operaciones, db as Instancia} from "../database/sequelize.js";

export const db = Instancia;

//Tablas
export const TB_POST = db.Post;

export const Op = Operaciones;