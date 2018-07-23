# Product listing page best practices

Check out the [Javascript Code](index.js) and the [HTML Code](index.html) to do this in the best, most performing, cross-browser way possible.


## Live demo

**[Show me in my browser!](https://www.andreaverlicchi.eu/productListingPageBestPractices/)** &larr; click there to open a live demo in your browser


## Features

### Eager, then lazy

- The first 8 images are eagerly loaded
- The images from the 9th ahead, which are expected to be "below the fold", are lazily loaded

This ensures the fastest possible loading and showing of the "above the fold" images, since the user won't have to wait until the javascript code is downloaded, parsed and executed to start viewing the first images.

The Google SpeedIndex KPI is very positively affected by this, since it measures visual changes on the page over time.


### Conditional loading of LazyLoad

Some modern browsers already support `IntersectionObserver`, used by LazyLoad 10.x to detect when an image entered the viewport. But some other browsers still don't support it, so they need to load LazyLoad 8.x, which features the same API but uses images coordinates in the scroll area to detect if they are inside the viewport (so it's slower).

The best way to deal with this is to conditionally load a different version of LazyLoad depending on the browser's `IntersectionObserver` support, to ensure full browser compatibility.


### Use LazyLoad to load an alternative image

There is a way to reuse LazyLoad's code to load the alternative images which appear at mouseover.


### Mouseover code is executed only when a mouse movement is detected

If any mouse movement is not detected in the page, the code to load the alternative images at mouseover is not executed. This is particularly good on and touch-only devices, such as smartphones.


### Fade-in when load is complete

To avoid having a partially loaded image which fades in on top of a fully loaded image, the fade-in of the alternative images only starts upon their loading is complete.