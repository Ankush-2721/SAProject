const express = require('express');
const routes = require('./Routes/route');
const cors = require('cors');
const { handleDuplicateEntryError } = require('./ErrorHandlers/ErrorHandler.js');

const app = express();
app.use(cors());
const port = 5005;

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

// Apply the error handling middleware globally
app.use((err, req, res, next) => {
    handleDuplicateEntryError(err, res);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});






