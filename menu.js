

function menu(game, events){
    console.log('Display the main menu');
    drawMainMenu(game);
}

function drawMainMenu(game){

    game.ctx.font = "30px Arial";
    game.ctx.strokeText("Hello World", 214, 159);

    game.ctx.fillStyle = "rgb(200, 0, 0)";
    game.ctx.fillRect(10, 10, 50, 50);
}

export {menu};