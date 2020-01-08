(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["features-contact-list"],{

/***/ "./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js":
/*!**********************************************************************!*\
  !*** ./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js ***!
  \**********************************************************************/
/*! exports provided: LazyLoadImageDirective, LazyLoadImageModule, intersectionObserverPreset, scrollPreset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadImageDirective", function() { return LazyLoadImageDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LazyLoadImageModule", function() { return LazyLoadImageModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intersectionObserverPreset", function() { return intersectionObserverPreset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollPreset", function() { return scrollPreset; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");






const cssClassNames = {
    loaded: 'ng-lazyloaded',
    loading: 'ng-lazyloading',
    failed: 'ng-failed-lazyloaded'
};
function removeCssClassName(element, cssClassName) {
    element.className = element.className.replace(cssClassName, '');
}
function addCssClassName(element, cssClassName) {
    if (!element.className.includes(cssClassName)) {
        element.className += ` ${cssClassName}`;
    }
}
function hasCssClassName(element, cssClassName) {
    return element.className && element.className.includes(cssClassName);
}

function getNavigator() {
    return typeof window !== 'undefined' ? window.navigator : undefined;
}
function isChildOfPicture(element) {
    return Boolean(element.parentElement && element.parentElement.nodeName.toLowerCase() === 'picture');
}
function isImageElement(element) {
    return element.nodeName.toLowerCase() === 'img';
}
function setImage(element, imagePath, useSrcset) {
    if (isImageElement(element)) {
        if (useSrcset && 'srcset' in element) {
            element.srcset = imagePath;
        }
        else {
            element.src = imagePath;
        }
    }
    else {
        element.style.backgroundImage = `url('${imagePath}')`;
    }
    return element;
}
function setSources(attrName) {
    return (image) => {
        const sources = image.parentElement.getElementsByTagName('source');
        for (let i = 0; i < sources.length; i++) {
            const attrValue = sources[i].getAttribute(attrName);
            if (attrValue) {
                // Check if `srcset` is supported by the current browser
                if ('srcset' in sources[i]) {
                    sources[i].srcset = attrValue;
                }
                else {
                    sources[i].src = attrValue;
                }
            }
        }
    };
}
const setSourcesToDefault = setSources('defaultImage');
const setSourcesToLazy = setSources('lazyLoad');
const setSourcesToError = setSources('errorImage');
function setImageAndSources(setSourcesFn) {
    return (element, imagePath, useSrcset) => {
        if (isImageElement(element) && isChildOfPicture(element)) {
            setSourcesFn(element);
        }
        if (imagePath) {
            setImage(element, imagePath, useSrcset);
        }
    };
}
const setImageAndSourcesToDefault = setImageAndSources(setSourcesToDefault);
const setImageAndSourcesToLazy = setImageAndSources(setSourcesToLazy);
const setImageAndSourcesToError = setImageAndSources(setSourcesToError);

const end = ({ element }) => addCssClassName(element, cssClassNames.loaded);
const loadImage = ({ element, useSrcset, imagePath, decode }) => {
    let img;
    if (isImageElement(element) && isChildOfPicture(element)) {
        const parentClone = element.parentNode.cloneNode(true);
        img = parentClone.getElementsByTagName('img')[0];
        setSourcesToLazy(img);
        setImage(img, imagePath, useSrcset);
    }
    else {
        img = new Image();
        if (isImageElement(element) && element.sizes) {
            img.sizes = element.sizes;
        }
        if (useSrcset && 'srcset' in img) {
            img.srcset = imagePath;
        }
        else {
            img.src = imagePath;
        }
    }
    if (decode && img.decode) {
        return img.decode().then(() => imagePath);
    }
    return new Promise((resolve, reject) => {
        img.onload = () => resolve(imagePath);
        img.onerror = () => reject(null);
    });
};
const setErrorImage = ({ element, errorImagePath, useSrcset }) => {
    setImageAndSourcesToError(element, errorImagePath, useSrcset);
    addCssClassName(element, cssClassNames.failed);
};
const setLoadedImage = ({ element, imagePath, useSrcset }) => {
    setImageAndSourcesToLazy(element, imagePath, useSrcset);
};
const setup = ({ element, defaultImagePath, useSrcset }) => {
    setImageAndSourcesToDefault(element, defaultImagePath, useSrcset);
    if (hasCssClassName(element, cssClassNames.loaded)) {
        removeCssClassName(element, cssClassNames.loaded);
    }
};
const isBot = navigator => {
    if (navigator && navigator.userAgent) {
        return /googlebot|bingbot|yandex|baiduspider|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora\ link\ preview|showyoubot|outbrain|pinterest\/0\.|pinterestbot|slackbot|vkShare|W3C_Validator|whatsapp|duckduckbot/i.test(navigator.userAgent);
    }
    return false;
};
const sharedPreset = {
    finally: end,
    loadImage,
    setErrorImage,
    setLoadedImage,
    setup,
    isBot
};

const observers = new WeakMap();
const intersectionSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
function loadingCallback(entrys) {
    entrys.forEach(entry => intersectionSubject.next(entry));
}
const uniqKey = {};
const getIntersectionObserver = (attributes) => {
    const scrollContainerKey = attributes.scrollContainer || uniqKey;
    const options = {
        root: attributes.scrollContainer || null
    };
    if (attributes.offset) {
        options.rootMargin = `${attributes.offset}px`;
    }
    let observer = observers.get(scrollContainerKey);
    if (!observer) {
        observer = new IntersectionObserver(loadingCallback, options);
        observers.set(scrollContainerKey, observer);
    }
    observer.observe(attributes.element);
    return rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"].create((obs) => {
        const subscription = intersectionSubject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(entry => entry.target === attributes.element)).subscribe(obs);
        return () => {
            subscription.unsubscribe();
            observer.unobserve(attributes.element);
        };
    });
};

const isVisible = ({ event }) => {
    return event.isIntersecting;
};
const getObservable = (attributes, _getInterObserver = getIntersectionObserver) => {
    if (attributes.customObservable) {
        return attributes.customObservable;
    }
    return _getInterObserver(attributes);
};
const intersectionObserverPreset = Object.assign({}, sharedPreset, {
    isVisible,
    getObservable
});

const isVisible$1 = () => {
    return true;
};
const getObservable$1 = () => {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])('load');
};
const loadImage$1 = ({ imagePath }) => {
    return [imagePath];
};
const ssrPreset = Object.assign({}, sharedPreset, {
    isVisible: isVisible$1,
    getObservable: getObservable$1,
    loadImage: loadImage$1
});

function createHooks(platformId, options) {
    const defaultPreset = intersectionObserverPreset;
    const isBot = options && options.isBot ? options.isBot : defaultPreset.isBot;
    if (isBot(getNavigator(), platformId)) {
        return Object.assign(ssrPreset, { isBot });
    }
    else if (!options) {
        return defaultPreset;
    }
    const hooks = {};
    if (options.preset) {
        Object.assign(hooks, options.preset);
    }
    else {
        Object.assign(hooks, defaultPreset);
    }
    Object.keys(options)
        .filter(key => key !== 'preset')
        .forEach(key => {
        hooks[key] = options[key];
    });
    return hooks;
}

function lazyLoadImage(hookSet, attributes) {
    return (evntObservable) => {
        return evntObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(event => hookSet.isVisible({
            element: attributes.element,
            event: event,
            offset: attributes.offset,
            scrollContainer: attributes.scrollContainer
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])(() => hookSet.loadImage(attributes)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(imagePath => hookSet.setLoadedImage({
            element: attributes.element,
            imagePath,
            useSrcset: attributes.useSrcset
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(() => true), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(() => {
            hookSet.setErrorImage(attributes);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(false);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(() => hookSet.finally(attributes)));
    };
}

let LazyLoadImageDirective = class LazyLoadImageDirective {
    constructor(el, ngZone, platformId, options) {
        this.onLoad = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"](); // Callback when an image is loaded
        this.elementRef = el;
        this.ngZone = ngZone;
        this.propertyChanges$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__["ReplaySubject"]();
        this.platformId = platformId;
        this.hooks = createHooks(platformId, options);
    }
    ngOnChanges() {
        this.propertyChanges$.next({
            element: this.elementRef.nativeElement,
            imagePath: this.lazyImage,
            defaultImagePath: this.defaultImage,
            errorImagePath: this.errorImage,
            useSrcset: this.useSrcset,
            offset: this.offset ? this.offset | 0 : 0,
            scrollContainer: this.scrollTarget,
            customObservable: this.customObservable,
            decode: this.decode
        });
    }
    ngAfterContentInit() {
        // Don't do anything if SSR and the user isn't a bot
        if (Object(_angular_common__WEBPACK_IMPORTED_MODULE_1__["isPlatformServer"])(this.platformId) && !this.hooks.isBot(getNavigator(), this.platformId)) {
            return null;
        }
        this.ngZone.runOutsideAngular(() => {
            this.scrollSubscription = this.propertyChanges$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])(attributes => this.hooks.setup(attributes)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(attributes => this.hooks.getObservable(attributes).pipe(lazyLoadImage(this.hooks, attributes))))
                .subscribe(success => this.onLoad.emit(success));
        });
    }
    ngOnDestroy() {
        if (this.scrollSubscription) {
            this.scrollSubscription.unsubscribe();
        }
    }
};
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])('lazyLoad'),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], LazyLoadImageDirective.prototype, "lazyImage", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], LazyLoadImageDirective.prototype, "defaultImage", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", String)
], LazyLoadImageDirective.prototype, "errorImage", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Object)
], LazyLoadImageDirective.prototype, "scrollTarget", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"])
], LazyLoadImageDirective.prototype, "customObservable", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Number)
], LazyLoadImageDirective.prototype, "offset", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], LazyLoadImageDirective.prototype, "useSrcset", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", Boolean)
], LazyLoadImageDirective.prototype, "decode", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"])(),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"])
], LazyLoadImageDirective.prototype, "onLoad", void 0);
LazyLoadImageDirective = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"])({
        selector: '[lazyLoad]'
    }),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])(_angular_core__WEBPACK_IMPORTED_MODULE_2__["PLATFORM_ID"])), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"])('options')),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"])("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"], _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"], Object, Object])
], LazyLoadImageDirective);

var LazyLoadImageModule_1;
let LazyLoadImageModule = LazyLoadImageModule_1 = class LazyLoadImageModule {
    static forRoot(options) {
        return {
            ngModule: LazyLoadImageModule_1,
            providers: [{ provide: 'options', useValue: options }]
        };
    }
};
LazyLoadImageModule = LazyLoadImageModule_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [LazyLoadImageDirective],
        exports: [LazyLoadImageDirective]
    })
], LazyLoadImageModule);

class Rect {
    constructor(left, top, right, bottom) {
        this.left = left;
        this.top = top;
        this.right = right;
        this.bottom = bottom;
    }
    static fromElement(element) {
        const { left, top, right, bottom } = element.getBoundingClientRect();
        if (left === 0 && top === 0 && right === 0 && bottom === 0) {
            return Rect.empty;
        }
        else {
            return new Rect(left, top, right, bottom);
        }
    }
    static fromWindow(_window) {
        return new Rect(0, 0, _window.innerWidth, _window.innerHeight);
    }
    inflate(inflateBy) {
        this.left -= inflateBy;
        this.top -= inflateBy;
        this.right += inflateBy;
        this.bottom += inflateBy;
    }
    intersectsWith(rect) {
        return rect.left < this.right && this.left < rect.right && rect.top < this.bottom && this.top < rect.bottom;
    }
    getIntersectionWith(rect) {
        const left = Math.max(this.left, rect.left);
        const top = Math.max(this.top, rect.top);
        const right = Math.min(this.right, rect.right);
        const bottom = Math.min(this.bottom, rect.bottom);
        if (right >= left && bottom >= top) {
            return new Rect(left, top, right, bottom);
        }
        else {
            return Rect.empty;
        }
    }
}
Rect.empty = new Rect(0, 0, 0, 0);

const scrollListeners = new WeakMap();
function sampleObservable(obs, scheduler) {
    return obs.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["sampleTime"])(100, scheduler), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["share"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''));
}
// Only create one scroll listener per target and share the observable.
// Typical, there will only be one observable per application
const getScrollListener = (scrollTarget) => {
    if (!scrollTarget || typeof scrollTarget.addEventListener !== 'function') {
        console.warn('`addEventListener` on ' + scrollTarget + ' (scrollTarget) is not a function. Skipping this target');
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["empty"])();
    }
    const scrollListener = scrollListeners.get(scrollTarget);
    if (scrollListener) {
        return scrollListener;
    }
    const srollEvent = rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"].create((observer) => {
        const eventName = 'scroll';
        const handler = (event) => observer.next(event);
        const options = { passive: true, capture: false };
        scrollTarget.addEventListener(eventName, handler, options);
        return () => scrollTarget.removeEventListener(eventName, handler, options);
    });
    const listener = sampleObservable(srollEvent);
    scrollListeners.set(scrollTarget, listener);
    return listener;
};

const isVisible$2 = ({ element, offset, scrollContainer }, getWindow = () => window) => {
    const elementBounds = Rect.fromElement(element);
    if (elementBounds === Rect.empty) {
        return false;
    }
    const windowBounds = Rect.fromWindow(getWindow());
    elementBounds.inflate(offset);
    if (scrollContainer) {
        const scrollContainerBounds = Rect.fromElement(scrollContainer);
        const intersection = scrollContainerBounds.getIntersectionWith(windowBounds);
        return elementBounds.intersectsWith(intersection);
    }
    else {
        return elementBounds.intersectsWith(windowBounds);
    }
};
const getObservable$2 = (attributes) => {
    if (attributes.customObservable) {
        return attributes.customObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["startWith"])(''));
    }
    if (attributes.scrollContainer) {
        return getScrollListener(attributes.scrollContainer);
    }
    return getScrollListener(window);
};
const scrollPreset = Object.assign({}, sharedPreset, {
    isVisible: isVisible$2,
    getObservable: getObservable$2
});


//# sourceMappingURL=ng-lazyload-image.js.map


/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/card/card.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/card/card.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nz-card [nzCover]=\"coverTemplate\"\n         [nzActions]=\"actions\"\n         [nzHoverable]=\"hoverable\"\n>\n  <nz-card-meta\n    [nzTitle]=\"title\"\n    [nzDescription]=\"description\"\n    [nzAvatar]=\"avatar\"\n  ></nz-card-meta>\n</nz-card>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/contact-card/contact-card.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/contact-card/contact-card.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<hb-card\n  [title]=\"title\"\n  [description]=\"descriptionTemplate\"\n  [hoverable]=\"hoverable\"\n  [id]=\"id\"\n  [coverTemplate]=\"coverTemplate\"\n  [avatar]=\"avatarTemplate\"\n></hb-card>\n\n<ng-template #coverTemplate>\n  <img [src]=\"pixelSrc || 'assets/contact.svg'\">\n  <img lazyLoad=\"{{src}}\">\n</ng-template>\n\n<ng-template #avatarTemplate>\n  <nz-avatar class=\"avatar\" [nzSrc]=\"icon\"></nz-avatar>\n</ng-template>\n\n<ng-template #descriptionTemplate>\n  <small>{{job}} | {{company_name}}</small>\n  <br/>\n  <small>Phone Number: {{phone}}</small>\n  <br/>\n  <small>{{email}}</small>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/input-search/input-search.component.html":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/components/input-search/input-search.component.html ***!
  \***********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nz-input-group [nzSuffix]=\"searchIcon\">\n  <input type=\"text\" nz-input placeholder=\"type to filter results\" #searchInput/>\n</nz-input-group>\n\n<ng-template #searchIcon>\n  <i nz-icon nzType=\"search\"></i>\n</ng-template>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/features/contact-list/contact-list.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/features/contact-list/contact-list.component.html ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<nz-layout class=\"contact-page\">\n  <nz-header class=\"contact-header\">\n    <nz-page-header>\n      <nz-page-header-title>My Contacts</nz-page-header-title>\n      <nz-page-header-subtitle>Here you can find all your contacts</nz-page-header-subtitle>\n      <nz-page-header-extra nz-col nzXs=\"24\" nzSm=\"24\" nzMd=\"12\" nzLg=\"6\" nzXl=\"6\">\n        <hb-input-search (onChange)=\"onSearchChanged($event)\"></hb-input-search>\n      </nz-page-header-extra>\n    </nz-page-header>\n  </nz-header>\n  <nz-content>\n    <nz-spin nzTip=\"Loading...\" [nzSpinning]=\"listLoading\" [nzDelay]=\"500\">\n      <nz-content class=\"contact-content\">\n        <div nz-row class=\"img-list-container\">\n          <div nz-col nzXs=\"12\" nzSm=\"12\" nzMd=\"8\" nzLg=\"6\" nzXl=\"6\"\n               style=\" padding: 15px; float: left!important;\"\n               *ngFor=\"let contact of filteredList\">\n            <hb-contact-card\n              [title]=\"contact.title\"\n              [job]=\"contact.job\"\n              [phone]=\"contact.phone\"\n              [company_name]=\"contact.company_name\"\n              [email]=\"contact.email\"\n              [src]=\"contact.src\"\n              [pixelSrc]=\"contact.pixelSrc\"\n              [id]=\"contact.id\"\n              [icon]=\"contact.icon\">\n            </hb-contact-card>\n          </div>\n        </div>\n      </nz-content>\n    </nz-spin>\n  </nz-content>\n</nz-layout>\n");

/***/ }),

/***/ "./src/app/components/card/card.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/components/card/card.component.scss ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host {\n  width: 100%;\n}\n:host .ng-lazyloaded {\n  opacity: 1;\n}\n:host ::ng-deep .ant-card {\n  background: transparent;\n}\n:host ::ng-deep .ant-card-actions {\n  background: transparent;\n  border-top: none;\n}\n.image-title-form {\n  width: 260px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hdmltYXNsYXRpMS9wcm9qZWN0cy9ob25leWJvb2svc3JjL2FwcC9jb21wb25lbnRzL2NhcmQvY2FyZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9jYXJkL2NhcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxXQUFBO0FDREY7QURHRTtFQUNFLFVBQUE7QUNESjtBRE1JO0VBQ0UsdUJBQUE7QUNKTjtBRE9JO0VBQ0UsdUJBQUE7RUFDQSxnQkFBQTtBQ0xOO0FEV0E7RUFDRSxZQUFBO0FDUkYiLCJmaWxlIjoic3JjL2FwcC9jb21wb25lbnRzL2NhcmQvY2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi8uLi92YXJpYWJsZXNcIjtcblxuOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcblxuICAubmctbGF6eWxvYWRlZCB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxuXG4gIDo6bmctZGVlcCB7XG5cbiAgICAuYW50LWNhcmQge1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgfVxuXG4gICAgLmFudC1jYXJkLWFjdGlvbnMge1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICBib3JkZXItdG9wOiBub25lO1xuICAgIH1cblxuICB9XG59XG5cbi5pbWFnZS10aXRsZS1mb3JtIHtcbiAgd2lkdGg6IDI2MHB4O1xufVxuIiwiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbn1cbjpob3N0IC5uZy1sYXp5bG9hZGVkIHtcbiAgb3BhY2l0eTogMTtcbn1cbjpob3N0IDo6bmctZGVlcCAuYW50LWNhcmQge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cbjpob3N0IDo6bmctZGVlcCAuYW50LWNhcmQtYWN0aW9ucyB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXItdG9wOiBub25lO1xufVxuXG4uaW1hZ2UtdGl0bGUtZm9ybSB7XG4gIHdpZHRoOiAyNjBweDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/components/card/card.component.ts":
/*!***************************************************!*\
  !*** ./src/app/components/card/card.component.ts ***!
  \***************************************************/
/*! exports provided: CardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardComponent", function() { return CardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let CardComponent = class CardComponent {
    constructor() {
        /**
         * @description an external template for different actions,
         * each html template must contain the template id and can have icon with CB function
         * can contains up to 3 actions,
         * @example
         * <ng-template #actionSetting>
         *   <i nz-icon nzType="delete" (click)="onDeleted(img)"></i>
         * </ng-template>
         */
        this.actions = [];
        /**
         * @description card cover image template
         */
        this.coverTemplate = null;
        /**
         * @description card avatar template
         */
        this.avatar = null;
        /**
         * rather or not car should show box shadow on hover
         */
        this.hoverable = true;
    }
    ngOnInit() {
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], CardComponent.prototype, "id", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], CardComponent.prototype, "title", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], CardComponent.prototype, "description", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], CardComponent.prototype, "actions", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], CardComponent.prototype, "coverTemplate", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], CardComponent.prototype, "avatar", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], CardComponent.prototype, "hoverable", void 0);
CardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'hb-card',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./card.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/card/card.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./card.component.scss */ "./src/app/components/card/card.component.scss")).default]
    })
], CardComponent);



/***/ }),

/***/ "./src/app/components/card/card.module.ts":
/*!************************************************!*\
  !*** ./src/app/components/card/card.module.ts ***!
  \************************************************/
/*! exports provided: CardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardModule", function() { return CardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _card_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./card.component */ "./src/app/components/card/card.component.ts");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");

// NG

// APP



let CardModule = class CardModule {
};
CardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _card_component__WEBPACK_IMPORTED_MODULE_2__["CardComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NgZorroAntdModule"]
        ],
        exports: [
            _card_component__WEBPACK_IMPORTED_MODULE_2__["CardComponent"]
        ]
    })
], CardModule);



/***/ }),

/***/ "./src/app/components/card/index.ts":
/*!******************************************!*\
  !*** ./src/app/components/card/index.ts ***!
  \******************************************/
/*! exports provided: CardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _card_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./card.component */ "./src/app/components/card/card.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CardComponent", function() { return _card_component__WEBPACK_IMPORTED_MODULE_1__["CardComponent"]; });





/***/ }),

/***/ "./src/app/components/contact-card/contact-card.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/components/contact-card/contact-card.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (":host ::ng-deep img {\n  position: absolute;\n  left: 0;\n  top: 0;\n  max-width: 100%;\n}\n:host ::ng-deep .ant-card {\n  overflow: hidden;\n}\n:host ::ng-deep .ant-card:hover .ant-card-body {\n  margin-top: -145px;\n  height: 155px;\n  transition-timing-function: ease-in;\n  transition: 0.35s;\n}\n:host ::ng-deep .ant-card-body {\n  background: #f0f2f5;\n  margin-top: -57px;\n  position: relative;\n  height: 67px;\n  transition-timing-function: ease-out;\n  transition: 0.35s;\n}\n:host ::ng-deep .ant-card-cover {\n  width: auto;\n  height: 250px;\n  position: relative;\n  overflow: hidden;\n}\n:host ::ng-deep .ant-avatar {\n  position: absolute;\n  top: -20px;\n  left: 15px;\n}\n:host ::ng-deep .ant-card-meta-title {\n  margin-top: 10px;\n}\n:host ::ng-deep .avatar {\n  background: white;\n  width: 45px;\n  height: 45px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hdmltYXNsYXRpMS9wcm9qZWN0cy9ob25leWJvb2svc3JjL2FwcC9jb21wb25lbnRzL2NvbnRhY3QtY2FyZC9jb250YWN0LWNhcmQuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbXBvbmVudHMvY29udGFjdC1jYXJkL2NvbnRhY3QtY2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHSTtFQUNFLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLE1BQUE7RUFDQSxlQUFBO0FDRk47QURLSTtFQUNFLGdCQUFBO0FDSE47QURNUTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1DQUFBO0VBQ0EsaUJBQUE7QUNKVjtBRFNJO0VBQ0UsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLG9DQUFBO0VBQ0EsaUJBQUE7QUNQTjtBRFVJO0VBQ0UsV0FBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FDUk47QURXSTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFVBQUE7QUNUTjtBRFlJO0VBQ0UsZ0JBQUE7QUNWTjtBRGFJO0VBQ0UsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ1hOIiwiZmlsZSI6InNyYy9hcHAvY29tcG9uZW50cy9jb250YWN0LWNhcmQvY29udGFjdC1jYXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICA6Om5nLWRlZXAge1xuXG4gICAgaW1nIHtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICB0b3A6IDA7XG4gICAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgfVxuXG4gICAgLmFudC1jYXJkIHtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgICAgICY6aG92ZXIge1xuICAgICAgICAuYW50LWNhcmQtYm9keSB7XG4gICAgICAgICAgbWFyZ2luLXRvcDogLTE0NXB4O1xuICAgICAgICAgIGhlaWdodDogMTU1cHg7XG4gICAgICAgICAgdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb246IGVhc2UtaW47XG4gICAgICAgICAgdHJhbnNpdGlvbjogMC4zNXM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAuYW50LWNhcmQtYm9keSB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjBmMmY1O1xuICAgICAgbWFyZ2luLXRvcDogLTU3cHg7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICBoZWlnaHQ6IDY3cHg7XG4gICAgICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7XG4gICAgICB0cmFuc2l0aW9uOiAwLjM1cztcbiAgICB9XG5cbiAgICAuYW50LWNhcmQtY292ZXIge1xuICAgICAgd2lkdGg6IGF1dG87XG4gICAgICBoZWlnaHQ6IDI1MHB4O1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB9XG5cbiAgICAuYW50LWF2YXRhciB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IC0yMHB4O1xuICAgICAgbGVmdDogMTVweDtcbiAgICB9XG5cbiAgICAuYW50LWNhcmQtbWV0YS10aXRsZSB7XG4gICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgIH1cblxuICAgIC5hdmF0YXIge1xuICAgICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgICB3aWR0aDogNDVweDtcbiAgICAgIGhlaWdodDogNDVweDtcbiAgICB9XG4gIH1cbn1cbiIsIjpob3N0IDo6bmctZGVlcCBpbWcge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgbWF4LXdpZHRoOiAxMDAlO1xufVxuOmhvc3QgOjpuZy1kZWVwIC5hbnQtY2FyZCB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG46aG9zdCA6Om5nLWRlZXAgLmFudC1jYXJkOmhvdmVyIC5hbnQtY2FyZC1ib2R5IHtcbiAgbWFyZ2luLXRvcDogLTE0NXB4O1xuICBoZWlnaHQ6IDE1NXB4O1xuICB0cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbjtcbiAgdHJhbnNpdGlvbjogMC4zNXM7XG59XG46aG9zdCA6Om5nLWRlZXAgLmFudC1jYXJkLWJvZHkge1xuICBiYWNrZ3JvdW5kOiAjZjBmMmY1O1xuICBtYXJnaW4tdG9wOiAtNTdweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDY3cHg7XG4gIHRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLW91dDtcbiAgdHJhbnNpdGlvbjogMC4zNXM7XG59XG46aG9zdCA6Om5nLWRlZXAgLmFudC1jYXJkLWNvdmVyIHtcbiAgd2lkdGg6IGF1dG87XG4gIGhlaWdodDogMjUwcHg7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbjpob3N0IDo6bmctZGVlcCAuYW50LWF2YXRhciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAtMjBweDtcbiAgbGVmdDogMTVweDtcbn1cbjpob3N0IDo6bmctZGVlcCAuYW50LWNhcmQtbWV0YS10aXRsZSB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG46aG9zdCA6Om5nLWRlZXAgLmF2YXRhciB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICB3aWR0aDogNDVweDtcbiAgaGVpZ2h0OiA0NXB4O1xufSJdfQ== */");

/***/ }),

/***/ "./src/app/components/contact-card/contact-card.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/contact-card/contact-card.component.ts ***!
  \*******************************************************************/
/*! exports provided: ContactCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactCardComponent", function() { return ContactCardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../card */ "./src/app/components/card/index.ts");

// ANGULAR

// APP

let ContactCardComponent = class ContactCardComponent extends _card__WEBPACK_IMPORTED_MODULE_2__["CardComponent"] {
    constructor() {
        super();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ContactCardComponent.prototype, "src", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ContactCardComponent.prototype, "pixelSrc", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ContactCardComponent.prototype, "alt", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ContactCardComponent.prototype, "icon", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ContactCardComponent.prototype, "company_name", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ContactCardComponent.prototype, "job", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ContactCardComponent.prototype, "email", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], ContactCardComponent.prototype, "phone", void 0);
ContactCardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'hb-contact-card',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./contact-card.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/contact-card/contact-card.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./contact-card.component.scss */ "./src/app/components/contact-card/contact-card.component.scss")).default]
    })
], ContactCardComponent);



/***/ }),

/***/ "./src/app/components/contact-card/contact-card.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/components/contact-card/contact-card.module.ts ***!
  \****************************************************************/
/*! exports provided: ContactCardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactCardModule", function() { return ContactCardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ant-design/icons-angular/icons */ "./node_modules/@ant-design/icons-angular/fesm2015/ant-design-icons-angular-icons.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js");
/* harmony import */ var _contact_card_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./contact-card.component */ "./src/app/components/contact-card/contact-card.component.ts");
/* harmony import */ var _card_card_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../card/card.module */ "./src/app/components/card/card.module.ts");

// NG


// VENDORS



// APP


const icons = [_ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_4__["DeleteOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_4__["EditOutline"], _ant_design_icons_angular_icons__WEBPACK_IMPORTED_MODULE_4__["MoreOutline"]];
let ContactCardModule = class ContactCardModule {
};
ContactCardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _contact_card_component__WEBPACK_IMPORTED_MODULE_6__["ContactCardComponent"]
        ],
        imports: [
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NgZorroAntdModule"],
            ng_lazyload_image__WEBPACK_IMPORTED_MODULE_5__["LazyLoadImageModule"],
            _card_card_module__WEBPACK_IMPORTED_MODULE_7__["CardModule"],
        ],
        exports: [
            _contact_card_component__WEBPACK_IMPORTED_MODULE_6__["ContactCardComponent"]
        ],
        providers: [
            {
                provide: ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NZ_ICONS"], useValue: icons
            }
        ]
    })
], ContactCardModule);



/***/ }),

/***/ "./src/app/components/input-search/input-search.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/components/input-search/input-search.component.scss ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvaW5wdXQtc2VhcmNoL2lucHV0LXNlYXJjaC5jb21wb25lbnQuc2NzcyJ9 */");

/***/ }),

/***/ "./src/app/components/input-search/input-search.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/components/input-search/input-search.component.ts ***!
  \*******************************************************************/
/*! exports provided: InputSearchComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputSearchComponent", function() { return InputSearchComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");

// NG

// VENDORS


let InputSearchComponent = class InputSearchComponent {
    constructor() {
        /**
         * @description event emitter for input change
         */
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        /**
         * use to close all component stream ant prevent potential memory leaks
         */
        this.componentUnsubscribe$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    ngAfterViewInit() {
        //create a stream from the input change event
        Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["fromEvent"])(this.searchInput.nativeElement, 'keyup')
            .pipe(
        // close stream
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this.componentUnsubscribe$), 
        //ignore when empty
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(Boolean), 
        //delay the output event
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(300), 
        // compare between prev and current value and fire only if there is changes
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])(), 
        // do action when change
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(() => {
            const inputValue = this.searchInput.nativeElement.value;
            this.onChange.emit(inputValue);
        }))
            // start to listing
            .subscribe();
    }
    ngOnDestroy() {
        this.componentUnsubscribe$.next();
        this.componentUnsubscribe$.complete();
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], InputSearchComponent.prototype, "onChange", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('searchInput', { static: false })
], InputSearchComponent.prototype, "searchInput", void 0);
InputSearchComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'hb-input-search',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./input-search.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/components/input-search/input-search.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./input-search.component.scss */ "./src/app/components/input-search/input-search.component.scss")).default]
    })
], InputSearchComponent);



/***/ }),

/***/ "./src/app/components/input-search/input-search.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/components/input-search/input-search.module.ts ***!
  \****************************************************************/
/*! exports provided: InputSearchModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputSearchModule", function() { return InputSearchModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _input_search_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./input-search.component */ "./src/app/components/input-search/input-search.component.ts");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd.js");





let InputSearchModule = class InputSearchModule {
};
InputSearchModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _input_search_component__WEBPACK_IMPORTED_MODULE_3__["InputSearchComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzInputModule"],
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_4__["NzIconModule"]
        ],
        exports: [
            _input_search_component__WEBPACK_IMPORTED_MODULE_3__["InputSearchComponent"]
        ]
    })
], InputSearchModule);



/***/ }),

/***/ "./src/app/features/contact-list/contact-list-routing.module.ts":
/*!**********************************************************************!*\
  !*** ./src/app/features/contact-list/contact-list-routing.module.ts ***!
  \**********************************************************************/
/*! exports provided: ContactListRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactListRoutingModule", function() { return ContactListRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _contact_list_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./contact-list.component */ "./src/app/features/contact-list/contact-list.component.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");

// ANGULAR


// APP


const routes = [
    {
        path: '',
        component: _contact_list_component__WEBPACK_IMPORTED_MODULE_3__["ContactListComponent"]
    }
];
let ContactListRoutingModule = class ContactListRoutingModule {
};
ContactListRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    }),
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [],
        imports: [
            _shared__WEBPACK_IMPORTED_MODULE_4__["SharedModule"]
        ]
    })
], ContactListRoutingModule);



/***/ }),

/***/ "./src/app/features/contact-list/contact-list.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/features/contact-list/contact-list.component.scss ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (".contact-page .contact-header {\n  background: transparent;\n}\n.contact-page .loading-button:before {\n  background: transparent;\n}\n.contact-page .contact-content {\n  min-height: 100vh;\n}\n.contact-page .img-list-container {\n  max-width: 1280px;\n  margin: 0 auto;\n}\n.contact-page .ant-layout-header {\n  height: auto;\n  padding: 0;\n  border-bottom: 1px solid #dedede;\n}\n.contact-page hb-input-search input {\n  background: transparent;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hdmltYXNsYXRpMS9wcm9qZWN0cy9ob25leWJvb2svc3JjL2FwcC9mZWF0dXJlcy9jb250YWN0LWxpc3QvY29udGFjdC1saXN0LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9mZWF0dXJlcy9jb250YWN0LWxpc3QvY29udGFjdC1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNFO0VBQ0UsdUJBQUE7QUNBSjtBRElJO0VBQ0UsdUJBQUE7QUNGTjtBRE1FO0VBQ0UsaUJBQUE7QUNKSjtBRE9FO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0FDTEo7QURRRTtFQUNFLFlBQUE7RUFDQSxVQUFBO0VBQ0EsZ0NBQUE7QUNOSjtBRFVJO0VBQ0UsdUJBQUE7QUNSTiIsImZpbGUiOiJzcmMvYXBwL2ZlYXR1cmVzL2NvbnRhY3QtbGlzdC9jb250YWN0LWxpc3QuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFjdC1wYWdlIHtcbiAgLmNvbnRhY3QtaGVhZGVyIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgfVxuXG4gIC5sb2FkaW5nLWJ1dHRvbiB7XG4gICAgJjpiZWZvcmUge1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICB9XG5cbiAgLmNvbnRhY3QtY29udGVudCB7XG4gICAgbWluLWhlaWdodDogMTAwdmg7XG4gIH1cblxuICAuaW1nLWxpc3QtY29udGFpbmVyIHtcbiAgICBtYXgtd2lkdGg6IDEyODBweDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgfVxuXG4gIC5hbnQtbGF5b3V0LWhlYWRlciB7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIHBhZGRpbmc6IDA7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNkZWRlZGU7XG4gIH1cblxuICBoYi1pbnB1dC1zZWFyY2gge1xuICAgIGlucHV0IHtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgfVxufVxuXG5cbiIsIi5jb250YWN0LXBhZ2UgLmNvbnRhY3QtaGVhZGVyIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG59XG4uY29udGFjdC1wYWdlIC5sb2FkaW5nLWJ1dHRvbjpiZWZvcmUge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cbi5jb250YWN0LXBhZ2UgLmNvbnRhY3QtY29udGVudCB7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xufVxuLmNvbnRhY3QtcGFnZSAuaW1nLWxpc3QtY29udGFpbmVyIHtcbiAgbWF4LXdpZHRoOiAxMjgwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xufVxuLmNvbnRhY3QtcGFnZSAuYW50LWxheW91dC1oZWFkZXIge1xuICBoZWlnaHQ6IGF1dG87XG4gIHBhZGRpbmc6IDA7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGVkZWRlO1xufVxuLmNvbnRhY3QtcGFnZSBoYi1pbnB1dC1zZWFyY2ggaW5wdXQge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/features/contact-list/contact-list.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/features/contact-list/contact-list.component.ts ***!
  \*****************************************************************/
/*! exports provided: ContactListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactListComponent", function() { return ContactListComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_contact_list_facade__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/contact-list.facade */ "./src/app/features/contact-list/services/contact-list.facade.ts");

// ANGULAR

// APP

let ContactListComponent = class ContactListComponent {
    constructor(facade) {
        this.facade = facade;
        /**
         * array of contact to display
         */
        this.filteredList = [];
        /**
         * loader when getting the lis of img
         */
        this.listLoading = true;
        /**
         * contact list
         */
        this.contactList = [];
    }
    ngOnInit() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            try {
                this.contactList = yield this.facade.getContactList();
                this.filteredList = [...this.contactList];
            }
            catch (e) {
                // error handling
            }
            this.listLoading = false;
        });
    }
    onSearchChanged(text) {
        if (!text) {
            return this.filteredList = [...this.contactList];
        }
        return this.filteredList = this.contactList
            .filter((contact) => {
            if (contact.description.toLowerCase().includes(text) || contact.title.toLowerCase().includes(text)) {
                return contact;
            }
        });
    }
};
ContactListComponent.ctorParameters = () => [
    { type: _services_contact_list_facade__WEBPACK_IMPORTED_MODULE_2__["ContactListFacade"] }
];
ContactListComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'hb-contact-list',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./contact-list.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/features/contact-list/contact-list.component.html")).default,
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./contact-list.component.scss */ "./src/app/features/contact-list/contact-list.component.scss")).default]
    })
], ContactListComponent);



/***/ }),

/***/ "./src/app/features/contact-list/contact-list.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/features/contact-list/contact-list.module.ts ***!
  \**************************************************************/
/*! exports provided: ContactListModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactListModule", function() { return ContactListModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js");
/* harmony import */ var _contact_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./contact-list.component */ "./src/app/features/contact-list/contact-list.component.ts");
/* harmony import */ var _contact_list_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./contact-list-routing.module */ "./src/app/features/contact-list/contact-list-routing.module.ts");
/* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared */ "./src/app/shared/index.ts");

// ANGULAR


// VENDORS

// APP



let ContactListModule = class ContactListModule {
};
ContactListModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _contact_list_component__WEBPACK_IMPORTED_MODULE_4__["ContactListComponent"]
        ],
        imports: [
            _contact_list_routing_module__WEBPACK_IMPORTED_MODULE_5__["ContactListRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            ng_lazyload_image__WEBPACK_IMPORTED_MODULE_3__["LazyLoadImageModule"],
            _shared__WEBPACK_IMPORTED_MODULE_6__["SharedModule"]
        ]
    })
], ContactListModule);



/***/ }),

/***/ "./src/app/features/contact-list/index.ts":
/*!************************************************!*\
  !*** ./src/app/features/contact-list/index.ts ***!
  \************************************************/
/*! exports provided: ContactListModule, ContactListComponent, ContactListFacade, ContactListService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _contact_list_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact-list.module */ "./src/app/features/contact-list/contact-list.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContactListModule", function() { return _contact_list_module__WEBPACK_IMPORTED_MODULE_1__["ContactListModule"]; });

/* harmony import */ var _contact_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contact-list.component */ "./src/app/features/contact-list/contact-list.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContactListComponent", function() { return _contact_list_component__WEBPACK_IMPORTED_MODULE_2__["ContactListComponent"]; });

/* harmony import */ var _services_contact_list_facade__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/contact-list.facade */ "./src/app/features/contact-list/services/contact-list.facade.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContactListFacade", function() { return _services_contact_list_facade__WEBPACK_IMPORTED_MODULE_3__["ContactListFacade"]; });

/* harmony import */ var _services_contact_list_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/contact-list.service */ "./src/app/features/contact-list/services/contact-list.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContactListService", function() { return _services_contact_list_service__WEBPACK_IMPORTED_MODULE_4__["ContactListService"]; });








/***/ }),

/***/ "./src/app/features/contact-list/services/contact-list.facade.ts":
/*!***********************************************************************!*\
  !*** ./src/app/features/contact-list/services/contact-list.facade.ts ***!
  \***********************************************************************/
/*! exports provided: ContactListFacade */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactListFacade", function() { return ContactListFacade; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _contact_list_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contact-list.service */ "./src/app/features/contact-list/services/contact-list.service.ts");

// NG

// APP

let ContactListFacade = class ContactListFacade {
    constructor(contactListService) {
        this.contactListService = contactListService;
    }
    /**
     * get list of contacts and return list of contact card
     */
    getContactList() {
        return this.contactListService.getContactList()
            .toPromise()
            .then(res => res.map((contact) => {
            return {
                title: contact.name,
                src: contact.profile_image,
                company_name: contact.company_name,
                job: contact.job,
                email: contact.email,
                phone: contact.phone,
                icon: contact.icon
            };
        }));
    }
};
ContactListFacade.ctorParameters = () => [
    { type: _contact_list_service__WEBPACK_IMPORTED_MODULE_2__["ContactListService"] }
];
ContactListFacade = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ContactListFacade);



/***/ }),

/***/ "./src/app/features/contact-list/services/contact-list.service.ts":
/*!************************************************************************!*\
  !*** ./src/app/features/contact-list/services/contact-list.service.ts ***!
  \************************************************************************/
/*! exports provided: ContactListService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContactListService", function() { return ContactListService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_services_contacts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/services/contacts */ "./src/app/shared/services/contacts/index.ts");

// ANGULAR

// APP

let ContactListService = class ContactListService {
    constructor(contactsApi) {
        this.contactsApi = contactsApi;
    }
    /**
     * return list of contacts from selected provider
     */
    getContactList() {
        return this.contactsApi.getContactList();
    }
};
ContactListService.ctorParameters = () => [
    { type: _shared_services_contacts__WEBPACK_IMPORTED_MODULE_2__["ContactsService"] }
];
ContactListService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ContactListService);



/***/ }),

/***/ "./src/app/shared/index.ts":
/*!*********************************!*\
  !*** ./src/app/shared/index.ts ***!
  \*********************************/
/*! exports provided: SharedModule, ContactsService, PROVIDER_LIST */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _share_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./share.module */ "./src/app/shared/share.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return _share_module__WEBPACK_IMPORTED_MODULE_1__["SharedModule"]; });

/* harmony import */ var _services_contacts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/contacts */ "./src/app/shared/services/contacts/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContactsService", function() { return _services_contacts__WEBPACK_IMPORTED_MODULE_2__["ContactsService"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PROVIDER_LIST", function() { return _services_contacts__WEBPACK_IMPORTED_MODULE_2__["PROVIDER_LIST"]; });






/***/ }),

/***/ "./src/app/shared/share.module.ts":
/*!****************************************!*\
  !*** ./src/app/shared/share.module.ts ***!
  \****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng-zorro-antd */ "./node_modules/ng-zorro-antd/fesm2015/ng-zorro-antd.js");
/* harmony import */ var ng_lazyload_image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ng-lazyload-image */ "./node_modules/ng-lazyload-image/fesm2015/ng-lazyload-image.js");
/* harmony import */ var _components_contact_card_contact_card_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/contact-card/contact-card.module */ "./src/app/components/contact-card/contact-card.module.ts");
/* harmony import */ var _components_card_card_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/card/card.module */ "./src/app/components/card/card.module.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _components_input_search_input_search_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/input-search/input-search.module */ "./src/app/components/input-search/input-search.module.ts");

// NG


// VENDOR
// APP






let SharedModule = class SharedModule {
};
SharedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [],
        imports: [
            // NG
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
            // VENDOR
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NgZorroAntdModule"],
            ng_lazyload_image__WEBPACK_IMPORTED_MODULE_4__["LazyLoadImageModule"].forRoot({}),
            // APP
            _components_contact_card_contact_card_module__WEBPACK_IMPORTED_MODULE_5__["ContactCardModule"],
            _components_card_card_module__WEBPACK_IMPORTED_MODULE_6__["CardModule"],
            _components_input_search_input_search_module__WEBPACK_IMPORTED_MODULE_8__["InputSearchModule"]
        ],
        exports: [
            // NG
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpClientModule"],
            // VENDOR
            ng_zorro_antd__WEBPACK_IMPORTED_MODULE_3__["NgZorroAntdModule"],
            ng_lazyload_image__WEBPACK_IMPORTED_MODULE_4__["LazyLoadImageModule"],
            // APP
            _components_contact_card_contact_card_module__WEBPACK_IMPORTED_MODULE_5__["ContactCardModule"],
            _components_card_card_module__WEBPACK_IMPORTED_MODULE_6__["CardModule"],
            _components_input_search_input_search_module__WEBPACK_IMPORTED_MODULE_8__["InputSearchModule"]
        ]
    })
], SharedModule);



/***/ })

}]);