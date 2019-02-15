void function (window, document) {
	var nextPage = 1;
	var thumbnails = $('.fk-thumbnails');
	var pager = $('.pg-pager');
	var lightbox = $('.lightbox-container');
	var lightboxTitle = $('.lightbox-title', lightbox);
	var lightboxImage = $('.lightbox-image', lightbox);
	var lightboxPrev = $('.lightbox-prev', lightbox);
	var lightboxNext = $('.lightbox-next', lightbox);
	var selection;

	more();
	thumbnails.addEventListener('click', clickedThumbnail);
	pager.addEventListener('click', clickedPager);
	lightbox.addEventListener('click', hide);
	lightboxPrev.addEventListener('click', stop(prev));
	lightboxNext.addEventListener('click', stop(next));
	document.addEventListener('keydown', shortcuts);

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('serviceworker.js');
	}

	function clickedThumbnail (e) {
		var el = e.target;
		if (el.tagName === 'IMG') {
			highlight(el);
		}
	}

	function clickedPager () {
		setClass(pager, 'pg-hidden', true);
		more();
	}

	function shortcuts (e) {
		if (!selection) {
			return;
		}
		var esc = 27;
		var left = 37;
		var right = 39;
		if (left === e.which) {
			prev();
		} else if (right === e.which) {
			next();
		} else if (esc === e.which) {
			hide();
		}
	}

	function stop (fn) {
		return function (e) {
			e.stopPropagation();
			return fn.apply(this, arguments);
		};
	}

	function prev () {
		if (selection.previousSibling) {
			highlight(selection.previousSibling);
		}
	}

	function next () {
		if (selection.nextSibling) {
			highlight(selection.nextSibling);
		}
	}

	function invalidate () {
		setClass(lightboxPrev, 'lightbox-disabled', !selection.previousSibling);
		setClass(lightboxNext, 'lightbox-disabled', !selection.nextSibling);
	}

	function highlight (thumb) {
		text(lightboxTitle, thumb.getAttribute('data-title'));
		lightboxImage.src = thumb.getAttribute('data-large');
		selection = thumb;
		setClass(lightbox, 'lightbox-show', true);
		invalidate();
	}

	function hide () {
		selection = null;
		setClass(lightbox, 'lightbox-show', false);
	}

	function more () {
		search('cute', 'kitten', nextPage++);
	}

	function search (terms, tags, page) {
		var query = {
			api_key: '7f1075dd1213418aab4d5a69ed12357a',
			method: 'flickr.photos.search',
			format: 'json',
			tags: tags,
			text: terms,
			page: page,
			per_page: 50
		};
		var url = 'https://api.flickr.com/services/rest';
		jsonp(url, query, renderPhotos);
	}

	function renderPhotos (data) {
		data.photos.photo.forEach(renderPhoto);
		setClass(pager, 'pg-hidden', false);
	}

	function renderPhoto (photo) {
		var thumb = tag('img', 'fk-photo');
		thumb.src = buildFlickrPhotoUrl(photo, '_q');
		thumb.setAttribute('data-large', buildFlickrPhotoUrl(photo));
		thumb.setAttribute('data-title', photo.title);
		thumbnails.appendChild(thumb);
	}

	function buildFlickrPhotoUrl (photo, postfix) {
		return [
			'https://farm', photo.farm,
			'.staticflickr.com/', photo.server,
			'/', photo.id,
			'_', photo.secret,
			postfix || '',
			'.jpg'].join('');
	}

	function tag (name, className) {
		var el = document.createElement(name);
		if (className) {
			el.className = className;
		}
		return el;
	}

	function text (el, value) {
		el.textContent = el.innerText = value;
	}

	function jsonp (url, query, done) {
		var key = query.jsoncallback = '_jsonp';
		var script = tag('script');
		script.src = url + qs(query);
		window[key] = done;
		document.body.appendChild(script);
	}

	function qs (query) {
		return '?' + Object.keys(query).map(keyValuePair).join('&');
		function keyValuePair (key) {
			return key + '=' + query[key];
		}
	}

	function setClass (el, className, enabled) {
		el.classList[enabled ? 'add' : 'remove'](className);
	}

	function $ (selector, context) {
		return (context || document).querySelector(selector);
	}
}(window, document);
