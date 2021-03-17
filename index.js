const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser')
const apolloServer = require('./backend/server.js');
const connect = require('./backend/connect.js')
const isAuth = require('./backend/middleware/is-auth');

require('dotenv').config();

// app.use(bodyParser.json());
const origin = process.env.NODE_ENV === 'production' ? "https://www.stitchil.com" : "http://localhost:3000";
app.use(cors({ credentials: true, origin, exposedHeaders: ["set-cookie"] }));

//middleware user auth check
app.use(cookieParser());
app.use(isAuth);
apolloServer.applyMiddleware({ app, path: "/graphql", cors: false });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') res.sendStatus(200);
    next();
});


const server = http.createServer(app)

// connect to db
connect()
    .then(() => {
        if (process.env.NODE_ENV === 'production') {
            app.use(express.static(path.join(__dirname, 'frontend', 'build')))
            app.get('*', (_, res) => {
                res.sendFile(path.resolve(path.join(__dirname, 'frontend', 'build', 'index.html'))), function (err) {
                    if (err) res.status(500).send(err)
                }
            })
        }
        const PORT = process.env.PORT || 5000;
        server.listen(PORT, () => console.log(`app's running on ${PORT} `));
    })










