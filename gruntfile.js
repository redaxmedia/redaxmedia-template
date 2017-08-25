module.exports = function (grunt)
{
	'use strict';

	/* config grunt */

	grunt.initConfig(
	{
		jsonlint: require('./tasks/jsonlint')(grunt),
		ncsslint: require('./tasks/ncsslint')(grunt),
		htmlhint: require('./tasks/htmlhint')(grunt),
		postcss: require('./tasks/postcss')(grunt),
		shell: require('./tasks/shell')(grunt)
	});

	/* load tasks */

	require('load-grunt-tasks')(grunt);

	/* register tasks */

	grunt.registerTask('default',
	[
		'jsonlint',
		'stylelint',
		'colorguard',
		'ncsslint',
		'htmlhint',
		'toclint'
	]);
	grunt.registerTask('stylelint',
	[
		'postcss:stylelint'
	]);
	grunt.registerTask('stylefmt',
	[
		'postcss:stylefmt'
	]);
	grunt.registerTask('colorguard',
	[
		'postcss:colorguard'
	]);
	grunt.registerTask('toclint',
	[
		'shell:toclintTemplates'
	]);
	grunt.registerTask('toc',
	[
		'shell:tocTemplates'
	]);
	grunt.registerTask('build',
	[
		'build-styles'
	]);
	grunt.registerTask('build-styles',
	[
		'postcss:templateRedaxmedia'
	]);
};
