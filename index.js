const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Product');
require('./models/ChatRoom');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
server = http.createServer(app);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./services/socket')(server);
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/productRoutes')(app);
require('./routes/chatRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });   
}

const PORT = process.env.PORT || 5000;
server.listen(PORT);