const hapi = require('@hapi/hapi');
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

    console.log("Creating Server")
    const server = hapi.server({
        port: creds.port,
        host: creds.host
    });

    await server.start();
    console.log("Server running on %s", server.info.uri);
    server.route(routes);

}
process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();