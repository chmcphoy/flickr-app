/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvoid function (window, document) {\n\tvar nextPage = 1;\n\tvar thumbnails = $('.fk-thumbnails');\n\tvar pager = $('.pg-pager');\n\tvar lightbox = $('.lightbox-container');\n\tvar lightboxTitle = $('.lightbox-title', lightbox);\n\tvar lightboxImage = $('.lightbox-image', lightbox);\n\tvar lightboxPrev = $('.lightbox-prev', lightbox);\n\tvar lightboxNext = $('.lightbox-next', lightbox);\n\tvar selection;\n\n\tmore();\n\tthumbnails.addEventListener('click', clickedThumbnail);\n\tpager.addEventListener('click', clickedPager);\n\tlightbox.addEventListener('click', hide);\n\tlightboxPrev.addEventListener('click', stop(prev));\n\tlightboxNext.addEventListener('click', stop(next));\n\tdocument.addEventListener('keydown', shortcuts);\n\n\tif ('serviceWorker' in navigator) {\n\t\tnavigator.serviceWorker.register('serviceworker.js');\n\t}\n\n\tfunction clickedThumbnail(e) {\n\t\tvar el = e.target;\n\t\tif (el.tagName === 'IMG') {\n\t\t\thighlight(el);\n\t\t}\n\t}\n\n\tfunction clickedPager() {\n\t\tsetClass(pager, 'pg-hidden', true);\n\t\tmore();\n\t}\n\n\tfunction shortcuts(e) {\n\t\tif (!selection) {\n\t\t\treturn;\n\t\t}\n\t\tvar esc = 27;\n\t\tvar left = 37;\n\t\tvar right = 39;\n\t\tif (left === e.which) {\n\t\t\tprev();\n\t\t} else if (right === e.which) {\n\t\t\tnext();\n\t\t} else if (esc === e.which) {\n\t\t\thide();\n\t\t}\n\t}\n\n\tfunction stop(fn) {\n\t\treturn function (e) {\n\t\t\te.stopPropagation();\n\t\t\treturn fn.apply(this, arguments);\n\t\t};\n\t}\n\n\tfunction prev() {\n\t\tif (selection.previousSibling) {\n\t\t\thighlight(selection.previousSibling);\n\t\t}\n\t}\n\n\tfunction next() {\n\t\tif (selection.nextSibling) {\n\t\t\thighlight(selection.nextSibling);\n\t\t}\n\t}\n\n\tfunction invalidate() {\n\t\tsetClass(lightboxPrev, 'lightbox-disabled', !selection.previousSibling);\n\t\tsetClass(lightboxNext, 'lightbox-disabled', !selection.nextSibling);\n\t}\n\n\tfunction highlight(thumb) {\n\t\ttext(lightboxTitle, thumb.getAttribute('data-title'));\n\t\tlightboxImage.src = thumb.getAttribute('data-large');\n\t\tselection = thumb;\n\t\tsetClass(lightbox, 'lightbox-show', true);\n\t\tinvalidate();\n\t}\n\n\tfunction hide() {\n\t\tselection = null;\n\t\tsetClass(lightbox, 'lightbox-show', false);\n\t}\n\n\tfunction more() {\n\t\tsearch('cute', 'kitten', nextPage++);\n\t}\n\n\tfunction search(terms, tags, page) {\n\t\tvar query = {\n\t\t\tapi_key: '7f1075dd1213418aab4d5a69ed12357a',\n\t\t\tmethod: 'flickr.photos.search',\n\t\t\tformat: 'json',\n\t\t\ttags: tags,\n\t\t\ttext: terms,\n\t\t\tpage: page,\n\t\t\tper_page: 50\n\t\t};\n\t\tvar url = 'https://api.flickr.com/services/rest';\n\t\tjsonp(url, query, renderPhotos);\n\t}\n\n\tfunction renderPhotos(data) {\n\t\tdata.photos.photo.forEach(renderPhoto);\n\t\tsetClass(pager, 'pg-hidden', false);\n\t}\n\n\tfunction renderPhoto(photo) {\n\t\tvar thumb = tag('img', 'fk-photo');\n\t\tthumb.src = buildFlickrPhotoUrl(photo, '_q');\n\t\tthumb.setAttribute('data-large', buildFlickrPhotoUrl(photo));\n\t\tthumb.setAttribute('data-title', photo.title);\n\t\tthumbnails.appendChild(thumb);\n\t}\n\n\tfunction buildFlickrPhotoUrl(photo, postfix) {\n\t\treturn ['https://farm', photo.farm, '.staticflickr.com/', photo.server, '/', photo.id, '_', photo.secret, postfix || '', '.jpg'].join('');\n\t}\n\n\tfunction tag(name, className) {\n\t\tvar el = document.createElement(name);\n\t\tif (className) {\n\t\t\tel.className = className;\n\t\t}\n\t\treturn el;\n\t}\n\n\tfunction text(el, value) {\n\t\tel.textContent = el.innerText = value;\n\t}\n\n\tfunction jsonp(url, query, done) {\n\t\tvar key = query.jsoncallback = '_jsonp';\n\t\tvar script = tag('script');\n\t\tscript.src = url + qs(query);\n\t\twindow[key] = done;\n\t\tdocument.body.appendChild(script);\n\t}\n\n\tfunction qs(query) {\n\t\treturn '?' + Object.keys(query).map(keyValuePair).join('&');\n\t\tfunction keyValuePair(key) {\n\t\t\treturn key + '=' + query[key];\n\t\t}\n\t}\n\n\tfunction setClass(el, className, enabled) {\n\t\tel.classList[enabled ? 'add' : 'remove'](className);\n\t}\n\n\tfunction $(selector, context) {\n\t\treturn (context || document).querySelector(selector);\n\t}\n}(window, document);\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ })

/******/ });