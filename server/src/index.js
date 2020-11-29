const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const middlewares = require('./middlewares');
const logs = require('./api/logs');

const app = express();


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/travel-log', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(morgan('common'));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hey There!',
    });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    
})

/*

<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="/__/firebase/8.1.1/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<!-- Initialize Firebase -->
<script src="/__/firebase/init.js"></script>

*/