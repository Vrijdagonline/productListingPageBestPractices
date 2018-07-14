(function(w, d) {
	const lazyClass = "lazy";
	var page_ll;

	w.lazyLoadOptions = {
		elements_selector: "img." + lazyClass
	};

	const saveInstance = e => {
		page_ll = e.detail.instance;
		w.removeEventListener("LazyLoad::Initialized", saveInstance);
	};

	const injectLazyLoadScript = () => {
		var v = !("IntersectionObserver" in w) ? "8.8.0" : "10.9.0";
		var b = d.getElementsByTagName("body")[0];
		var s = d.createElement("script");
		s.async = true;
		s.src = `https://cdnjs.cloudflare.com/ajax/libs/vanilla-lazyload/${v}/lazyload.min.js`;
		w.addEventListener("LazyLoad::Initialized", saveInstance, false);
		b.appendChild(s);
	};

	const lazyLoadImg = img => {
		img.classList.add(lazyClass);
		page_ll.update();
	};

	const mouseoverHandler = event => {
		var product = event.currentTarget;
		var lazyImg = product.querySelector(".lazy-hover");
		if (!lazyImg.classList.contains(lazyClass)) {
			lazyLoadImg(lazyImg);
		}
	};

	const initializeMouseBehaviour = () => {
		const products = document.querySelectorAll(".product");
		products.forEach(product => {
			product.addEventListener("mouseover", mouseoverHandler, true);
		});
	};

	const mousemoveHandler = () => {
		w.removeEventListener("mousemove", mousemoveHandler, false);
		initializeMouseBehaviour();
	};

	w.addEventListener("mousemove", mousemoveHandler, false);
	injectLazyLoadScript();
})(window, document);
