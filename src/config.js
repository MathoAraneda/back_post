import {config} from "dotenv";
config();

export default
{
    port: process.env.PORT || 3850,
    db_user: process.env.DB_USER,
    db_pass: process.env.DB_PASSWORD,
    db_server: process.env.DB_SERVER,
    db_port: process.env.DB_PORT,
    db_database: process.env.DB_DATABASE,
}