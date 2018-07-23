var PAGE_LAZYLOAD; // GLOBAL page lazyload instance

(function() {
	//
	// LazyLoad's callbacks, options and injection

	const lazyLoadHandlers = {
		callback_load: img => {
			console.log("LOADED", img.getAttribute("data-srcset"));
		},
		callback_enter: img => {
			console.log("ENTERED", img.getAttribute("data-srcset"));
		},
		callback_error: img => {
			console.log("ERROR", img.getAttribute("data-srcset"));
		}
	};

	const injectLazyLoadScript = () => {
		var version = !("IntersectionObserver" in window)
			? "8.11.0"
			: "10.10.0";
		var body = document.getElementsByTagName("body")[0];
		var script = document.createElement("script");
		script.async = true;
		script.src = `https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/${version}/lazyload.min.js`;
		window.addEventListener("LazyLoad::Initialized", saveInstance, false);
		body.appendChild(script);
	};

	const saveInstance = e => {
		PAGE_LAZYLOAD = e.detail.instance;
		window.removeEventListener("LazyLoad::Initialized", saveInstance);
	};

	window.lazyLoadOptions = {
		elements_selector: "img.lazy",
		...lazyLoadHandlers
	};

	injectLazyLoadScript();
})();

(function() {
	//
	// Page events handlers

	var $window = $(window);

	const mouseoverHandler = function() {
		var lazyImg = $(this).find(".lazy-hover")[0];
		PAGE_LAZYLOAD.load(lazyImg);
	};

	const listenToMouseover = () => {
		console.log("Adding a single listener for mouseover to all products");
		$(".products").on("mouseover", ".product", mouseoverHandler);
	};

	const initializeMouseEvents = () => {
		console.log("Mouse detected. Initializing mouse events.");
		listenToMouseover();
		$window.off("mousemove", initializeMouseEvents);
	};

	$(function() {
		$window.on("mousemove", initializeMouseEvents);
	});
})();
