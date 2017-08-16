module.exports = function (grunt)
{
	'use strict';

	/* config grunt */

	grunt.initConfig(
	{
		version: grunt.file.readJSON('package.json').version,
		jsonlint:
		{
			dependency:
			{
				src:
				[
					'composer.json',
					'package.json'
				]
			},
			ruleset:
			{
				src:
				[
					'.htmlhintrc',
					'.stylelintrc',
					'.tocgen'
				]
			}
		},
		ncsslint:
		{
			templateRedaxmedia:
			{
				options:
				{
					path: 'templates/redaxmedia/*.phtml',
					namespace: 'rs',
					loglevel: 'info',
					haltonerror: true
				}
			}
		},
		htmlhint:
		{
			templates:
			{
				src:
				[
					'templates/**/*.phtml'
				]
			},
			options:
			{
				htmlhintrc: '.htmlhintrc'
			}
		},
		postcss:
		{
			templateRedaxmedia:
			{
				src:
				[
					'templates/redaxmedia/assets/styles/_redaxmedia.css'
				],
				dest: 'templates/redaxmedia/dist/styles/redaxmedia.min.css'
			},
			stylelint:
			{
				src:
				[
					'templates/*/assets/styles/*.css'
				],
				options:
				{
					processors:
					[
						require('stylelint'),
						require('postcss-reporter')(
						{
							throwError: true
						})
					]
				}
			},
			stylefmt:
			{
				src:
				[
					'templates/*/assets/styles/*.css'
				],
				options:
				{
					processors:
					[
						require('stylefmt')
					]
				}
			},
			colorguard:
			{
				src:
				[
					'templates/*/dist/styles/*.css'
				],
				options:
				{
					processors:
					[
						require('colorguard')(
						{
							threshold: 2,
							allowEquivalentNotation: true
						}),
						require('postcss-reporter')(
						{
							throwError: true
						})
					]
				}
			},
			options:
			{
				processors:
				[
					require('postcss-import'),
					require('postcss-custom-properties'),
					require('postcss-custom-media'),
					require('postcss-custom-selectors'),
					require('postcss-nesting'),
					require('postcss-extend'),
					require('postcss-color-gray'),
					require('postcss-color-function'),
					require('autoprefixer')(
					{
						browsers: 'last 2 versions'
					}),
					require('cssnano')(
					{
						autoprefixer: false,
						colormin: false,
						zindex: false
					})
				]
			}
		},
		shell:
		{
			tocTemplates:
			{
				command: 'sh vendor/bin/tocgen.sh templates/redaxmedia/assets/styles .tocgen'
			},
			toclintTemplates:
			{
				command: 'sh vendor/bin/tocgen.sh templates/redaxmedia/assets/styles .tocgen -l'
			},
			options:
			{
				stdout: true,
				failOnError: true
			}
		},
		watch:
		{
			styles:
			{
				files:
				[
					'assets/styles/*.css',
					'templates/**/assets/styles/*.css'
				],
				tasks:
				[
					'build-styles'
				]
			}
		}
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
