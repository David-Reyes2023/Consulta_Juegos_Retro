
const HttpError = require('../models/http-error');
const uuid = require('uuid');

let DUMMY_GAMES = [
    {
        id: 'g1',
        title: 'Mario Bros',
        creator: 'u1'
    },
    {
        id: 'g2',
        title: 'Sonic',
        creator: 'u2'
    },
    {
        id: 'g3',
        title: 'Street Fighter',
        creator: 'u3'
    },
    {
        id: 'g4',
        title: 'Teken',
        creator: 'u4'
    },
    {
        id: 'g5',
        title: 'FIFA',
        creator: 'u5'
    },
    {
        id: 'g6',
        title: 'Tomb Rider',
        creator: 'u7'
    },
    {
        id: 'g7',
        title: 'BATMAN',
        creator: 'u7'
    }
];

const getAllGames = (req, res, next)=>{
    res.json({games : DUMMY_GAMES});
};

const getGamesById = (req, res, next) => {    
    const game = DUMMY_GAMES.find(p => {
        return p.id === req.params.pid;
    });
    if (!game){        
        const error = new Error('El juego en mención, no existe para el id especificado');
        error.code = 404;
        next(error);
    }
    else{
        res.json({game});
    }    
};

const getGamesByUsers = (req, res, next)=>{
    const games = DUMMY_GAMES.find(p => {
        return p.creator === req.params.uid
    });    

    if (!games){
        const error = new HttpError('El juego en mención, no existe para el id de usuario especificado', 404);
        throw error;
    }

    res.json({games});
};

const saveGame = (req, res, next)=>{
    const {title, creator} = req.body;
    const createdGame = {
        id: uuid.v4(),
        title,
        creator
    };
    DUMMY_GAMES.push(createdGame);
    res.status(201).json({game:createdGame});
    res.json({games});
};
//updateGames = Patch
const updateGame = (req,res,next)=>{
    const {title} = req.body;
    const gameId= req.params.pid;
    console.log(gameId);
    const updatedGame = {... DUMMY_GAMES.find(p=>p.id === gameId)};
    const gamesIndex = DUMMY_GAMES.findIndex(p=>p.id === gameId);
    updatedGame.title = title;
    DUMMY_GAMES [gamesIndex] = updatedGame;
    res.status(200).json({game : updatedGame});    
};

const deleteGame = (req, res, next) => {
    const gameId = req.params.pid;
    DUMMY_GAMES = DUMMY_GAMES.filter (p => p.id !== gameId)
    res.status(200).json({message: 'Juego Borrado'});
};

exports.getAllGames = getAllGames;
exports.getGamesById = getGamesById;
exports.getGamesByUsers = getGamesByUsers;
exports.saveGame = saveGame;
exports.updateGame = updateGame;
exports.deleteGame = deleteGame;