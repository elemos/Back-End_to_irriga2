//Arquivo responsavel por configurar a rotina de log

const myLoggers = require('log4js');
var date = new Date ();
var strin = date.getDate;
myLoggers.configure({
    appenders: { mylogger: { type:"file", filename: "./logs/log.txt"} },
    categories: { default: { appenders:["mylogger"], level:"ALL" } }
});
const logger = myLoggers.getLogger("log");

module.exports = logger;