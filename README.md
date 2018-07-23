# Product listing page best practices

Check out the [Javascript Code](index.js) and the [HTML Code](index.html) to do this in the best, most performing, cross-browser way possible.

## Lazy MouseOver Image

An optimal usage of LazyLoad both for regular and alternative images (the ones loaded at mouseover) is to:

1. Conditional loads LazyLoad v.8 or v.10 depending on `IntersectionObserver` support
2. Eagerly loads the first 8 images, lazily loads the images from the 9th on
3. If a mouse movement is detected, lazily loads the alternative images which appear at mouseover. The fade-in of the alternative images starts only upon their loading is complete.