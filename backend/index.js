const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// Routes
// require any routes here if needed. e.g: `const books = require('./routes/api/books');`

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Server running...'));

// use Routes
// Use the routes here. e.g: `app.use('/api/books', books);`

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));