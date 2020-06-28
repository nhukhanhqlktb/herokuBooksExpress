// server.js
// where your node app starts
// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
//=======================================================================================
require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const pug = require('pug');
const cookieParser = require('cookie-parser');
//============CONNECT DATABASE===============
const mongoose = require('mongoose');
const Book = require('./models/book.model');
mongoose.connect(process.env.MONGO_URL_CONNECT, 
                 {useNewUrlParser: true,
                  useUnifiedTopology: true});
//============APP ROUTE============
const app = express();
const userRoute = require('./routes/user.route');
const bookRoute = require('./routes/book.route');
const transactionRoute = require('./routes/transaction.route');
const authRoute = require('./routes/auth.route');
const profileRoute = require('./routes/profile.route');
const cartRoute = require('./routes/cart.route');
//============APP ROUTE API============
const apiAuthRoute = require('./api/routes/auth.route');
const apiUserRoute = require('./api/routes/user.route');
const apiTransactionRoute = require('./api/routes/transaction.route');
//===========MIDDLEWARE============
const cookieMiddleware = require('./middlewares/cookie.middleware');
const authMiddleware = require('./middlewares/auth.middleware');
const localsMiddleware = require('./middlewares/locals.middleware');
const sessionMiddleware = require('./middlewares/session.middleware');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('123abc'));

app.use(express.static("public"));
app.use(cookieMiddleware.setCookie);
app.use(sessionMiddleware);
app.use(localsMiddleware);

app.get("/", (req, res) => {
  res.render('index.pug');
});

app.use('/api/login', apiAuthRoute);
app.use('/api/users', apiUserRoute);
app.use('/api/transactions', apiTransactionRoute);

app.use('/auth', authRoute);
app.use('/books', bookRoute);
app.use('/cart', cartRoute);
app.use('/users', authMiddleware.requiredAuth, userRoute);
app.use('/profile', authMiddleware.requiredAuth, profileRoute);
app.use('/transactions', authMiddleware.requiredAuth, transactionRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
