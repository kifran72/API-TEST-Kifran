let express = require('express');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let generator = require('generate-password');
let bodyParser = require('body-parser');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let flash = require('connect-flash');
let twig = require("twig");
// let mongoose = require('mongoose');
// let configDB = require('./config/database.js');
// mongoose.connect(configDB.url);
let mysql = require('mysql');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "api"
});
let port = process.env.PORT || 3000;
let app = express();

// permet d'utiliser ces dossiers grace a une route static
app.use('/vendor', express.static('./public/vendor'));
app.use('/dist', express.static('./public/dist'));
app.use('/less', express.static('./public/less'));
app.use('/js', express.static('./public/js'));
app.use('/css', express.static('./public/css'));

// initialise cookiparser, bodyparser et indique le moteur de template (twig) ainssi que le dossier default et le type de vue 
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', 'public');
app.set('view engine', 'html');
app.engine('html', twig.__express);
app.set('twig options', {
    strict_variables: false,
});

// initialise une session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))


// ROUTE

require('./app/routes.js')(app, session, passport, generator, con);


// launch ======================================================================

app.listen(port);
console.log('N°port: ' + port);