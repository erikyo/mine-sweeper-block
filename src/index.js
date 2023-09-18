/**
 * WordPress dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Plugin dependencies
 */
import Edit from './edit';
import Save from './save';

import './style/style.scss';

/** Import the block default configuration */
const blockConfig = require( '../block.json' );

/** The block icon */
export const svgIcon =
	'<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="400" height="400" viewBox="0 0 100 100"><path d="M90 47.5h-5V45h-5.4c-.8-4.6-2.6-8.8-5.2-12.4l3.9-3.8-1.8-1.8 3.6-3.5-3.6-3.6-3.5 3.6-1.8-1.8-3.8 3.9A29.8 29.8 0 0 0 55 20.4V15h-2.5v-5h-5v5H45v5.4c-4.6.8-8.8 2.6-12.4 5.2l-3.8-3.9-1.8 1.8-3.5-3.6-3.6 3.6 3.6 3.5-1.8 1.8 3.9 3.8A29.8 29.8 0 0 0 20.4 45H15v2.5h-5v5h5V55h5.4c.8 4.6 2.6 8.8 5.2 12.4l-3.9 3.8 1.8 1.8-3.6 3.5 3.6 3.6 3.5-3.6 1.8 1.8 3.8-3.9c3.6 2.6 7.8 4.4 12.4 5.2V85h2.5v5h5v-5H55v-5.4c4.6-.8 8.8-2.6 12.4-5.2l3.8 3.9 1.8-1.8 3.5 3.6 3.6-3.6-3.6-3.5 1.8-1.8-3.9-3.8c2.6-3.6 4.4-7.8 5.2-12.4H85v-2.5h5v-5ZM50 25v5c-11 0-20 9-20 20h-5a25 25 0 0 1 25-25Z"/></svg>';

/**
 * Register the mineswper block
 */
registerBlockType( blockConfig.name, {
	...blockConfig,
	icon: svgIcon,
	edit: Edit,
	save: Save,
	supports: {
		align: true,
		anchor: true,
		className: true,
		color: {
			background: true,
			gradients: true,
		},
		spacing: {
			margin: true, // Enable margin UI control.
			padding: true, // Enable padding UI control.
			blockGap: true, // Enables block spacing UI control.
		},
	},
	attributes: {
		style: {
			type: 'object',
			default: {},
		},
		tableRows: {
			type: 'number',
			default: 12,
		},
		tableCols: {
			type: 'number',
			default: 24,
		},
		bombCount: {
			type: 'number',
			default: 55,
		},
	},
} );
