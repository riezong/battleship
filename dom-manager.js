import game from './game';

const container = document.querySelector('.container');

const domManager = (function () {
	// const player1 = game.player1.gameboard;
	// const player1Grid = player1.grid;

	// const grid1 = document.createElement('div');
	// grid1.setAttribute('class', 'grid1');
	// grid1.textContent = 'test';
	// container.appendChild(grid1);

	// const attackBtn = document.createElement('button');
	// attackBtn.textContent = 'attack!';
	// function attackDialogue() {
	// 	player1.receiveAttack(7, 2);
	// 	refreshBoard();
	// }
	// attackBtn.addEventListener('click', attackDialogue);
	// container.appendChild(attackBtn);

	const clearBoard = function (gridElement) {
		while (gridElement.firstChild) {
			gridElement.removeChild(gridElement.lastChild);
		}
	};

	const renderBoard = function (gameboard, gridContainerElement) {
		clearBoard(gridContainerElement);

		for (let row = 0; row < gameboard.grid.length; row++) {
			const gridRow = document.createElement('div');
			gridRow.setAttribute('class', 'row');
			gridContainerElement.appendChild(gridRow);

			for (let column = 0; column < gameboard.grid[row].length; column++) {
				const gridColumn = document.createElement('div');
				gridColumn.setAttribute('class', 'column');
				gridColumn.textContent = `${row},${column}`;

				gridRow.appendChild(gridColumn);
			}
		}
	};

	return {
		renderPlayerBoard: renderBoard,
	};
})();

export default domManager;
