<?php
namespace Redaxscript;

return Db::forTablePrefix('extras')
	->where('alias', 'badge')
	->findOne()
	->text;