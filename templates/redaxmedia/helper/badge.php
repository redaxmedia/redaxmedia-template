<?php
namespace Redaxscript;

$badge = Db::forTablePrefix('extras')
	->where('alias', 'badge')
	->findOne()
	->text;