module.exports = function ()
{
	'use strict';

	var config =
	{
		templateRedaxmedia:
		{
			src:
			[
				'templates/redaxmedia/*.phtml'
			]
		},
		options:
		{
			htmlhintrc: '.htmlhintrc'
		}
	};

	return config;
};