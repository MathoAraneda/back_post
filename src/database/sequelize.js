import config from "../config.js";
import { Sequelize, DataTypes, Op } from "sequelize";


// modelos
import PostModel from "./model/Post.js";


//Conexion a la base de datos
const sequelize = new Sequelize(config.db_database, config.db_user, config.db_pass, {
    host: config.db_server,
    port: config.db_port,
    dialect: 'postgres', // Explicitly set for PostgreSQL
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    // Logging
    // logging: console.log,  // or false to disable
    // logging: (msg) => logger.debug(msg),
    // Timezone
    timezone: '+00:00',
    
    // SSL
    // dialectOptions: {
    //   ssl: {
    //     require: false,
    //     rejectUnauthorized: false,
    //   },
    // },
  
});

// const sequelize = new Sequelize(config.db_server, config.db_user, config.db_pass,
//     {
//         dialect: "postgres",
//         host: config.db_server,
//         port: config.db_port,
//         encrypt: false,
//         dialectOptions: {
//             requestTimeout: 300000,
//             ssl: false,
//             options: {
//                 useUTC: false,
//                 dateFirst: 1,
//                 requestTimeout: 300000,
//                 encrypt: false,

//             }
//         },
//         pool: {
//             max: 15,
//             min: 0,
//             acquire: 60000,
//             idle: 10000
//         },
//         define: {
//             timestamps: false,
//             freezeTableName: true
//         }
//     });

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

//inyeccion de modelos
const Post = PostModel(sequelize, DataTypes);


db.Post = Post;



export { db, Op };
