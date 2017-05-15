<?php
namespace Redaxscript\Template;

$timelineArray = [];
$categories = Tag::categoryRaw()->where('status', 1)->findMany();
$articles = Tag::articleRaw()->whereNotNull('category')->where('status', 1)->orderByDesc('date');
if (Tag::getRegistry('firstParameter'))
{
	$categoryId = Tag::getRegistry('categoryId');
	$articles = $articles->where('category', $categoryId);
}
$articles = $articles->findMany();
$dateFormat = Tag::getSetting('date');

/* process articles */

foreach ($articles as $article)
{
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
			'date' => date($dateFormat, strtotime($article->date))
		],
		'categoryArray' =>
		[
			'title' => $category->title,
			'alias' => $category->alias
		]
	];
}
