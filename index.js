(function(w, d) {
	const lazyClass = "lazy";
	var page_ll;

	const saveInstance = e => {
		page_ll = e.detail.instance;
		w.removeEventListener("LazyLoad::Initialized", saveInstance);
	};

	const injectLazyLoadScript = () => {
		var v = !("IntersectionObserver" in w) ? "8.11.0" : "10.10.0";
		var b = d.getElementsByTagName("body")[0];
		var s = d.createElement("script");
		s.async = true;
		s.src = `https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/${v}/lazyload.min.js`;
		w.addEventListener("LazyLoad::Initialized", saveInstance, false);
		b.appendChild(s);
	};

	const mouseoverHandler = event => {
		var product = event.currentTarget;
		var lazyImg = product.querySelector(".lazy-hover");
		page_ll.load(lazyImg);
	};

	const listenToMouseover = () => {
		const products = document.querySelectorAll(".product");
		products.forEach(product => {
			console.log("Adding a listener for mouseover to --> ", product);
			product.addEventListener("mouseover", mouseoverHandler, true);
		});
	};

	const initializeMouseEvents = () => {
		console.log("Mouse detected. Initializing mouse events.");
		listenToMouseover();
		w.removeEventListener("mousemove", initializeMouseEvents, false);
	};

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

	w.lazyLoadOptions = {
		elements_selector: "img." + lazyClass,
		...lazyLoadHandlers
	};

	w.addEventListener("mousemove", initializeMouseEvents, false);
	injectLazyLoadScript();
})(window, document);
