const dotenv = require('dotenv');
dotenv.config( { path : './config.env'} );
const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const connectDB = require('./server/database/connection');
const app = express();
const authRoutes = require('./server/routes/router');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const cors = require('cors');
const { recorddbs } = require('./server/model/model');
const PORT = 3000;

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}));

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.set('etag', false);

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store')
    next()
  })

// set view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'));
app.use(express.static(path.join(__dirname, '/public')));

app.locals.company = "Hubilo";

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))

// load routers

app.use('/', require('./server/routes/router'));

app.get('*', checkUser);
app.get('/', (req, res) => res.render('index'));
app.get('/home', requireAuth, (req, res) => res.render('home'));
app.use(authRoutes);


app.listen(PORT, ()=> { console.log(`Server is running`)});