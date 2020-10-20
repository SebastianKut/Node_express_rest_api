//instal and require moment to format our date
const moment = require('moment');

//create middleware logger function - middleware gives you acces to req and res objects
const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

module.exports = logger;