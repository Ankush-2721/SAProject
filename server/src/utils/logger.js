// const fs = require('fs');
// const path = require('path');

// const logsDirectory = path.join(__dirname, '..', 'logs');
// const logFilePath = path.join(logsDirectory, 'app.log');

// // Ensure the logs directory exists
// if (!fs.existsSync(logsDirectory)) {
//     fs.mkdirSync(logsDirectory);
// }

// const writeLog = (message) => {
//     const timestamp = new Date().toISOString();
//     const logMessage = `${timestamp}: ${message}\n`;

//     fs.appendFileSync(logFilePath, logMessage);
// };

// module.exports = { writeLog };
