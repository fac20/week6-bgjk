const fs = require("fs");
const path = require("path");
const db = require("./connection");

const initPath = path.join(__dirname, "init.sql");
const initSQL = fs.readFileSync(initPath, "utf-8");

const build = () => db.query(initSQL);

module.exports = build;
