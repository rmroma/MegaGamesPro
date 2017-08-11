var db = require('../../accessDB')
  , util = require('util');

// GET
exports.games = function (req, res) {
  console.log('*** games');

  db.getGames(function(err, games) {
    if (err) {
      console.log('*** games err');
      res.json({
        customers: games
      });
    } else {
      console.log('*** games ok');

      res.json(games);
    }
  });
};

exports.postGameReview = function(req, res){
  console.log('*** games');

  db.insertReview(req.body, function(err){
    if (err) {
      console.log('*** postGameReview err');
      res.json(false);
    } else {
      console.log('*** postGameReview ok');

      res.json(req.body);
    }
  });
};


exports.game = function (req, res) {
  console.log('*** game');

  db.getGame(req.params.id, function(err, game) {
    if (err) {
      console.log('*** game err');
      res.json({
        customer: game
      });
    } else {
      console.log('*** game ok');

      res.json(game);
    }
  });
};

exports.insertGame = function (req, res) {
  console.log('*** insertGame ====  ' +  req.body);

      db.insertGame(req.body, function(err){
        if (err) {
          console.log('*** insertGame err');
          res.json(false);
        } else {
          console.log('*** insertGame ok');

          res.json(req.body);
        }
      });

};

 exports.editGame = function (req, res) {
  console.log('*** editGame');

      db.editGame(req.params.id, req.body, function(err) {
        if (err) {
          console.log('*** editGame err' + util.inspect(err));
          res.json({'status': false});
        } else {
          console.log('*** editGame ok');

          res.json({'status': true});
        }
      });
};

exports.deleteGame = function (req, res) {
  console.log('*** deleteGame');

  db.deleteGame(req.params.id, function(err) {
    if (err) {
      console.log('*** deleteGame err');
      res.json({'status': false});
    } else {
      console.log('*** deleteGame ok');
      res.json({'status': true});
    }
  });
};


exports.byFilters = function (req, res) {
  console.log('*** byGenre');

  db.getGamesByFilter(req.query, function(err, games) {
    if (err) {
      console.log('*** byFilters err');
      res.json({'status': false});
    } else {
      console.log('*** byFilters ok');
      res.json(games);
    }
  });
};




