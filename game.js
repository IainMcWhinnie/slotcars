
const gameStates = {
    MainMenu: 0,
}

function createGame(ctx){

    var curState = gameStates.MainMenu;
    var ctx = ctx;

    return {curState, ctx};
}

export {createGame, gameStates};