module.exports = function ()
{
	'use strict';

	var config =
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
	};

	return config;
};