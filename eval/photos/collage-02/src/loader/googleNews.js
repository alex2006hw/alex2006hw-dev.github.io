'use strict';

// This one is a bit questionable since it's deprecated, and the TOS for use in
// collages is unclear.

var mustache = require('../../bower_components/mustache/mustache.js');
var getFromApi = require('./getFromCommonApi.js');
var SimpleElement = require('../element/Simple.js');
	
window.credits = window.credits || {};
var credits = window.credits.googleNews = {};

module.exports = function(collage, query){
	return search(query);
};

var ARTICLE_TEMPLATE = '' +
'<div class="article-wrapper">' +
	'{{#image}}' +
		'<a href="{{image.contextUrl}}">' +
			'<img title="Image by {{image.publisher}}" class="article-image" ' + 
			'src="{{image.src}}" width="{{image.width}}" height="{{image.height}}"/>' + 
		'</a>' +
	'{{/image}}' +
	'<a class="article-title" href="{{sourceUrl}}">{{{title}}}</a>' + 
	'<p class="article-attribution">' +
		'<span class="article-publisher">{{{publisher}}}</span>' +
		' &ndash; <span class="article-date">{{date}}</span>' +
		' via {{#gnewsUrl}}<a class="article-via" href="{{gnewsUrl}}">{{/gnewsUrl}}' + 
		'Google News{{#gnewsUrl}}</a>{{/gnewsUrl}}' +
	'</p>' +
	'<p class="article-body">{{{body}}}</p>' +
'</div>';

var documentFragment = document.createDocumentFragment();

var search = (function(){
	var endpoint = 'https://ajax.googleapis.com/ajax/services/search/news';
	//var endpoint = '/ajax/services/search/news';

	return function(query){
		var params = [
				'v=1.0',
				'rsz=8',
				'q=' + encodeURIComponent(query)
			];
		
		return getFromApi(endpoint, params).then(function(response){
			var elements = [];
			response.responseData.results.forEach(function(item){
				credits[item.publisher] = item.unescapedUrl;

				var templateParams = {
					title: item.titleNoFormatting,
					sourceUrl: item.unescapedUrl,
					publisher: item.publisher,
					date: (new Date(item.publishedDate)).toLocaleDateString(),
					gnewsUrl: item.clusterUrl,
					body: item.content
				};
								
				if(item.image){
					templateParams.image = {
						src: item.image.tbUrl,
						width: item.image.tbWidth,
						height: item.image.tbHeight,
						publisher: item.image.publisher,
						contextUrl: item.image.originalContextUrl
					};
				}

				var element = document.createElement('div');
				element.className = 'gnews-article';
				element.innerHTML = mustache.render(ARTICLE_TEMPLATE, templateParams);
				document.body.appendChild(element);
				
				element.width = element.clientWidth;
				element.height = element.clientHeight;

				elements.push(new SimpleElement(element));
				documentFragment.appendChild(element);
			});

			return elements;
		});
	};
}());

