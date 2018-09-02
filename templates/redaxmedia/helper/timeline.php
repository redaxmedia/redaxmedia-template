<?php
namespace Redaxscript;

$timelineArray = [];
$categories = Db::forTablePrefix('categories')->where('status', 1)->findMany();
$articles = Db::forTablePrefix('articles')->whereNotNull('category')->where('status', 1)->orderByDesc('date');
if (Template\Helper::getRegistry('firstParameter'))
{
	$categoryId = Template\Helper::getRegistry('categoryId');
	$articles = $articles->where('category', $categoryId);
}
$articles = $articles->findMany();
$dater = new Dater();

/* process articles */

foreach ($articles as $article)
{
	$dater->init($article->date);
	$eventAlias = $article->alias;
	$category = $categories[$article->category - 1];
	$timelineArray[$eventAlias] =
	[
		'articleArray' =>
		[
			'title' => $article->title,
			'alias' => $article->alias,
			'route' => $category->alias . '/' . $article->alias,
			'text' => $article->text,
			'date' => $dater->formatDate()
		],
		'categoryArray' =>
		[
			'title' => $category->title,
			'alias' => $category->alias,
			'route' => $category->alias
		]
	];
}
