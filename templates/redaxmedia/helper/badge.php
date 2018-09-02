<?php
namespace Redaxscript;

$badge = Db::forTablePrefix('articles')
	->where(
	[
		'alias' => 'skills',
		'status' => 1
	])
	->findOne();
