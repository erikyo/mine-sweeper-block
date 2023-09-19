const components = {
	num_of_rows: 12,
	num_of_cols: 24,
	num_of_bombs: 55,
	bomb: '💣',
	bombs: [],
	colors: {
		1: 'blue',
		2: 'green',
		3: 'red',
		4: 'purple',
		5: 'maroon',
		6: 'turquoise',
		7: 'black',
		8: 'grey',
	},
};

let alive = true;

function startGame() {
	components.bombs = placeBombs();
	document.getElementById( 'field' ).appendChild( createTable() );
	document
		.getElementById( 'new-game-button' )
		.addEventListener( 'click', reload );
}

function placeBombs() {
	let i;
	const rows = [];

	for ( i = 0; i < components.num_of_bombs; i++ ) {
		placeSingleBomb( rows );
	}
	return rows;
}

function placeSingleBomb( bombs ) {
	let row;
	const nrow = Math.floor( Math.random() * components.num_of_rows );
	const ncol = Math.floor( Math.random() * components.num_of_cols );
	row = bombs[ nrow ];

	if ( ! row ) {
		row = [];
		bombs[ nrow ] = row;
	}

	const col = row[ ncol ];

	if ( ! col ) {
		row[ ncol ] = true;
	} else {
		placeSingleBomb( bombs );
	}
}

function cellID( i, j ) {
	return 'cell-' + i + '-' + j;
}

function createTable() {
	let row, td, i, j;
	const table = document.createElement( 'table' );

	for ( i = 0; i < components.num_of_rows; i++ ) {
		row = document.createElement( 'tr' );
		for ( j = 0; j < components.num_of_cols; j++ ) {
			td = document.createElement( 'td' );
			td.id = cellID( i, j );
			row.appendChild( td );
			addCellListeners( td, i, j );
		}
		table.appendChild( row );
	}
	return table;
}

function addCellListeners( td, i, j ) {
	td.addEventListener( 'mousedown', function ( event ) {
		if ( ! alive ) {
			return;
		}
		components.mousewhiches += event.which;
		if ( event.which === 3 ) {
			return;
		}
		if ( this.flagged ) {
			return;
		}
		this.style.backgroundColor = 'lightGrey';
	} );

	td.addEventListener( 'mouseup', function ( event ) {
		if ( ! alive ) {
			return;
		}

		if ( this.clicked && components.mousewhiches === 4 ) {
			performMassClick( this, i, j );
		}

		components.mousewhiches = 0;

		if ( event.which === 3 ) {
			if ( this.clicked ) {
				return;
			}
			if ( this.flagged ) {
				this.flagged = false;
				this.textContent = '';
			} else {
				this.flagged = true;
				this.textContent = components.flag;
			}

			event.preventDefault();
			event.stopPropagation();

			return false;
		}
		handleCellClick( this, i, j );
	} );

	td.oncontextmenu = function () {
		return false;
	};
}

function handleCellClick( cell, i, j ) {
	if ( ! alive ) {
		return;
	}

	if ( cell.flagged ) {
		return;
	}

	cell.clicked = true;

	if ( components.bombs[ i ][ j ] ) {
		cell.style.color = 'red';
		cell.textContent = components.bomb;
		gameOver();
	} else {
		cell.style.backgroundColor = 'lightGrey';
		const bombsCount = adjacentBombs( i, j );
		if ( bombsCount ) {
			cell.style.color = components.colors[ bombsCount ];
			cell.textContent = bombsCount;
		} else {
			clickAdjacentBombs( i, j );
		}
	}
}

function adjacentBombs( row, col ) {
	let i, j, bombsCount;
	bombsCount = 0;

	for ( i = -1; i < 2; i++ ) {
		for ( j = -1; j < 2; j++ ) {
			if (
				components.bombs[ row + i ] &&
				components.bombs[ row + i ][ col + j ]
			) {
				bombsCount++;
			}
		}
	}
	return bombsCount;
}

function adjacentFlags( row, col ) {
	let i, j, flagsCount;
	flagsCount = 0;

	for ( i = -1; i < 2; i++ ) {
		for ( j = -1; j < 2; j++ ) {
			const cell = document.getElementById( cellID( row + i, col + j ) );
			if ( !! cell && cell.flagged ) {
				flagsCount++;
			}
		}
	}
	return flagsCount;
}

function clickAdjacentBombs( row, col ) {
	let i, j, cell;

	for ( i = -1; i < 2; i++ ) {
		for ( j = -1; j < 2; j++ ) {
			if ( i === 0 && j === 0 ) {
				continue;
			}
			cell = document.getElementById( cellID( row + i, col + j ) );
			if ( !! cell && ! cell.clicked && ! cell.flagged ) {
				handleCellClick( cell, row + i, col + j );
			}
		}
	}
}

function performMassClick( cell, row, col ) {
	if ( adjacentFlags( row, col ) === adjacentBombs( row, col ) ) {
		clickAdjacentBombs( row, col );
	}
}

function gameOver() {
	alive = false;
	document.getElementById( 'lost' ).style.display = 'block';
}

function reload() {
	window.location.reload();
}

window.addEventListener( 'load', function () {
	document.getElementById( 'lost' ).style.display = 'none';
	startGame();
} );
