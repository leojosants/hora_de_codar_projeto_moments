const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const linkURL = `http://localhost:${port}`;

app.use(
    cors()
);

app.use(
    express.json()
);

app.use(
    express.static('public')
);

const conn = require('./database/conn');
conn();

const memoryRoutes = require('./routes');

app.use(
    '/memories', memoryRoutes
);

app.listen(
    port, async () => {
        console.log('Servidor executando');
        console.log(`Ctrl + click ${linkURL}`);
    }
);