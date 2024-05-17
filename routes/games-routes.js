const express = require('express');

const gamesControllers = require('../controllers/games-controllers');

const router = express.Router();

router.get('/', gamesControllers.getAllGames);

router.get('/:pid', gamesControllers.getGamesById);

router.get('/users/:uid', gamesControllers.getGamesByUsers);

router.post('/', gamesControllers.saveGame);

router.patch('/:pid', gamesControllers.updateGame);

router.delete('/:pid', gamesControllers.deleteGame);

module.exports = router;
