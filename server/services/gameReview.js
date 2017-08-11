// Module dependencies
var GameReview = require('../models/gameReview');

module.exports = {

    // insert a game
    insertReview: function (req_body, callback) {
        console.log('*** accessDB.insertReview');

        var gameReview = new GameReview();

        gameReview.gameName = req_body.gameName;
        gameReview.title = req_body.title;
        gameReview.score = req_body.score;
        gameReview.content = req_body.content;
        gameReview.date = req_body.date;
        gameReview.userId = req_body.userId;
        gameReview.id = 1;

        gameReview.save(function (err, gameReview) {
            if (err) {
                console.log('*** new gameReview save err: ' + err);
                return callback(err);
            }
            callback(null, gameReview.id);
        });
    },

    // insert a game
    editReview: function (id, req_body, callback) {
        console.log('*** accessDB.editReview');

        GameReview.findOne({'id': id}, function (err, gameReview) {
            if (err) {
                return callback(err);
            }

            gameReview.id = id;
            gameReview.gameName = req_body.gameName || gameReview.gameName;
            gameReview.title = req_body.title || gameReview.title;
            gameReview.content = req_body.content || gameReview.content;
            gameReview.score = req_body.score || gameReview.score;
            gameReview.date = req_body.date || gameReview.date;

            gameReview.save(function (err) {
                if (err) {
                    console.log('*** accessDB.editReview err: ' + err);
                    return callback(err);
                }

                callback(null, gameReview);
            });
        });
    },

    // delete a game
    deleteGameReview: function (id, callback) {
        console.log('*** accessDB.deleteGame');
        GameReview.remove({'id': id}, function (err, gameReview) {
            callback(null);
        });
    },

    groupByScore: function (gameName, callback) {
        console.log('*** accessDB.groupByScore');
        GameReview.aggregate([{$match: {gameName: gameName}}, {
            "$group": {
                _id: "$score",
                count: {$sum: 1}
            }
        }], function (err, gameReview) {
            callback(null, gameReview);
        });
    },

    averageScore: function (gameName, callback) {
        console.log('*** accessDB.averageScore');
        GameReview.aggregate([{$match: {gameName: gameName}}, {
            "$group": {
                "_id": null,
                "score": {"$avg": "$score"}
            }
        }], function (err, gameReview) {
            if (gameReview.length > 0 && !err) {
                callback(null, gameReview[0].score);
            } else {
                callback(err);
            }
        });
    },

    // get all the games
    getGamesReviewByFilter: function (params, callback) {
        var myFilter = {};
        if (params.gameName && params.gameName !== "")
            myFilter['gameName'] = params.gameName;
        if (params.title && params.title !== "")
            myFilter['title'] = params.title;
        if (params.score && params.score !== "")
            myFilter['score'] = {$gte: params.score};
        console.log('*** accessDB.getGamesByFilter');
        GameReview.find(myFilter, function (err, gameReview) {
            callback(null, gameReview);

        });
    }
};
