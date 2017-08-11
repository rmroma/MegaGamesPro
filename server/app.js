var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    errorhandler = require('errorhandler'),
    csrf = require('csurf'),
    passport = require('passport'),
    DB = require('./accessDB'),
    protectJSON = require('./lib/protectJSON'),
    flash = require('connect-flash'),
    app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(session({
    secret: 'customermanagerstandard',
    saveUninitialized: true,
    resave: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../'));
app.use(errorhandler());
app.use(protectJSON);
app.use(csrf());

// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(function (req, res, next) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
});

// ===== Connection string for DB =====
var conn = 'mongodb://localhost/custmgr';
var db;
db = new DB.startup(conn);


// Routes
require('./routes/basicRoutes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./config/passport')(passport); // pass passport for configuration

// Start server

var io = require('socket.io').listen(app.listen(3000, function () {
    console.log("CustMgr Express server listening on port %d in %s mode", this.address().port, app.settings.env);
}));

io.sockets.on('connection', function (socket) {
    socket.on('gameCreated', function (data) {
        console.log('A new game has been created.');
        io.sockets.emit('newGame', data);
    });
});
