const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');
const relationRoutes = require('./routes/relation.routes');
const sanitize = require('./middleware/sanitizer');
const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
connectDB();

app.use(sanitize);

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/relation', relationRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
