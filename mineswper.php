<?php

/**
 * Plugin Name:       MINESWPER
 * Description:       IS BACK!
 * Version:           0.0.1
 * Requires at least: 5.7
 * Tested up to:      6.0.3
 * Requires PHP:      7.1.0
 * Author:            codekraft
 * Author URI:        https://codekraft.it
 * License:           GPL v3 or later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       MSW
 */

/**
 * Register the block by passing the location of block.json to register_block_type.
 */
add_action( 'init', function() {
	register_block_type( dirname(__FILE__) . '/block.json' );
} );
