const pg = require("pg");
const dotenv = require("dotenv");

// get variables from .env file
dotenv.config();

//change the active database depending on if we are testing or not

const options = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

if (process.env.NODE_ENV === "test") {
  connectionString = process.env.TEST_DATABASE_URL;
}

// creat pool of connections to database
const db = new pg.Pool(options);

//export for use elsewhere
module.exports = db;
