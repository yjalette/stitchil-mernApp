const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser')
const apolloServer = require('./backend/server.js');
const connect = require('./backend/connect.js')
const isAuth = require('./backend/middleware/is-auth');
const origin = require('./backend/consts/origin');
require('dotenv').config();

// cookies headers
app.use(cookieParser());
app.use(cors({ credentials: true, origin, exposedHeaders: ["set-cookie"] }));
//middleware user auth check
app.use(isAuth);
apolloServer.applyMiddleware({ app, path: "/graphql", cors: false });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') res.sendStatus(200);
    next();
});

const ws = http.createServer(app);
apolloServer.installSubscriptionHandlers(ws);

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
        ws.listen(PORT, () => {
            console.log(`app's running on ${PORT} `)
        }
        );

    })





