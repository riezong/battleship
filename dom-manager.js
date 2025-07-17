import game from './game';

const domManager = (function () {
	const container = document.querySelector('.container');
	container.textContent = 'test';

	const player1 = game.player1.gameboard.grid;
})();

export default domManager;
