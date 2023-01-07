
const gameStates = {
    MainMenu: 0,
    OnePlayer: 1,
}

function createGame(ctx, width, height){

    var curState = gameStates.MainMenu;
    var ctx = ctx;

    return {curState, ctx, width, height};
}

export {createGame, gameStates};