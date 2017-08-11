var routes = require('../routes'),
    user = require('../models/user.js'),
    db = db = require('../accessDB'),
    mongoose = require('mongoose'),
    User = require('../models/user');
    gameApi = require('../routes/api/game');
    gameReviewApi = require('../routes/api/gameReview');


module.exports = function(app, passport) {


    app.get('/api/dataservice/Games', gameApi.games);
    app.get('/api/dataservice/Game/:id', gameApi.game);
    app.delete('/api/dataservice/deleteGame/:id', gameApi.deleteGame);
    app.put('/api/dataservice/PutGame/:id', gameApi.editGame);
    app.post('/api/dataservice/PostGame', gameApi.insertGame);
    app.get('/api/dataservice/byFilters/?', gameApi.byFilters);

    app.delete('/api/dataservice/deleteGameReview/:id', gameReviewApi.deleteGameReview);
    app.put('/api/dataservice/PutGameReview/:id', gameReviewApi.editGameReview);
    app.post('/api/dataservice/PostGameReview', gameReviewApi.insertGameReview);
    app.get('/api/dataservice/reviewByFilters/?', gameReviewApi.byFilters);
    app.get('/api/dataservice/groupByScore/:gameName', gameReviewApi.groupByScore);
    app.get('/api/dataservice/averageScore/:gameName', gameReviewApi.averageScore);
    app.get('/api/dataservice/deleteReview/:id', gameReviewApi.deleteGameReview);

    // =====================================
    // LOGIN ===============================
    // ======================================

    app.post('/api/login', passport.authenticate('local-login'),
        function(req, res) {
            user.find({'local.email': req.body.email}, {}, function(err, user) {
                res.json(user[0]);
            });
        }
    );

    app.post('/api/admin', passport.authenticate('local-is-admin'),
        function(req, res) {
            res.send(200);
        }
    );

    // =====================================
    // SIGNUP ==============================
    // =====================================
    app.post('/api/register', passport.authenticate('local-signup', {
        successRedirect : '/customers', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/api/logout', function(req,res){
        req.logOut();
        req.session.destroy(function (err) {
            res.redirect('/'); //Inside a callback… bulletproof!
        });
    });

    app.get('/', routes.index);

    // redirect all others to the index (HTML5 history)
    app.get('*', routes.index);
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect(401);
}
