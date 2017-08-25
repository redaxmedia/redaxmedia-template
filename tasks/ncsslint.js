module.exports = function ()
{
	'use strict';

	var config =
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
	};

	return config;
};