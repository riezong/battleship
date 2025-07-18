import game from './game';

const container = document.querySelector('.container');

const player1 = game.player1.gameboard;
const player1Grid = player1.grid;

const domManager = (function () {
	container.textContent = 'test';

	const grid1 = document.createElement('div');
	grid1.setAttribute('class', 'grid1');
	grid1.textContent = 'test';
	container.appendChild(grid1);

	const attackBtn = document.createElement('button');
	attackBtn.textContent = 'attack!';
	function attackDialogue() {
		player1.receiveAttack(7, 2);
		refreshBoard();
	}
	attackBtn.addEventListener('click', attackDialogue);
	container.appendChild(attackBtn);
})();

const clearBoard = function () {
	const grid1 = document.querySelector('.grid1');
	while (grid1.firstChild) {
		grid1.removeChild(grid1.lastChild);
	}
};

const renderBoard = function () {
	const grid1 = document.querySelector('.grid1');
	for (let row = 0; row < player1Grid.length; row++) {
		const gridRow = document.createElement('div');
		gridRow.setAttribute('class', 'row');
		// gridRow.textContent = `${'row' + (row + 1)}`;
		grid1.appendChild(gridRow);
		for (let column = 0; column < player1Grid[row].length; column++) {
			const gridColumn = document.createElement('div');
			gridColumn.setAttribute('class', 'column');
			gridColumn.textContent = `${player1Grid[row][column]}`;
			// gridColumn.textContent = `${'column' + (column + 1)}`;
			gridRow.appendChild(gridColumn);
		}
	}
};

const refreshBoard = function () {
	clearBoard();
	renderBoard();
};
refreshBoard();

export default domManager;
