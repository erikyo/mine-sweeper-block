const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		mineswper: path.resolve( process.cwd(), `src/index.js` ),
		'mineswper-front': path.resolve(
			process.cwd(),
			`src/scripts/minesweeper.js`
		),
	},
	output: {
		path: path.join( __dirname, './build' ),
	},
};
