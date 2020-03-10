const hapi = require('@hapi/hapi');
const app = express();
const axios = require('axios');
const mysql = require('mysql');
let routes = require('./routes')


//Credential and Environment VarSetup
require('dotenv').config()
const creds = {
    host: process.env.HOST,
    dbserver: process.env.DBHOST,
    user: process.env.RHUSER,
    password: process.env.RHPW,
    name: process.env.DBNAME,
    port: process.env.PORT,
    dbport: process.env.DBPORT
}

//Initialize the connection with the database
const db = mysql.createConnection ({
    host: creds.dbserver,
    user: creds.user,
    password: creds.password,
    database: creds.name
});

db.connect((error) => {
    if (error) {
        throw error;
    }
    console.log("Successfully Connected to Database");
    global.db = db;
});


const init = async() => {

    const server = Hapi.server({
        port: creds.port,
        host: creds.host
    });

    server.route(routes)

}