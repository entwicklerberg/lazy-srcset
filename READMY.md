# lazy-srcset

Zero-configuration responsive image optimization for modern websites.

Provide only the original image path and let the library automatically:

* Generate a low-resolution placeholder
* Generate a responsive `srcset`
* Calculate the optimal `sizes` attribute
* Apply native `loading="lazy"`
* Apply native `decoding="async"`
* Prevent layout shifts (CLS) using `aspect-ratio`
* Load images using `IntersectionObserver`
* Optimize image delivery for Core Web Vitals

---

## Why lazy-srcset?

| Device           | Traditional Image | lazy-srcset     |
| ---------------- | ----------------- | --------------- |
| Mobile (390px)   | 1920px / 450 KB   | 480px / 35 KB   |
| Tablet (768px)   | 1920px / 450 KB   | 768px / 90 KB   |
| Desktop (1440px) | 1920px / 450 KB   | 1440px / 250 KB |

Benefits:

* Smaller image downloads
* Faster page rendering
* Better Lighthouse scores
* Reduced mobile bandwidth usage
* Improved Core Web Vitals
* Reduced CLS (Cumulative Layout Shift)

---

## Features

* 🚀 Automatic lazy loading
* 📱 Automatic responsive image generation
* 🖼️ Automatic placeholder generation
* ⚡ Automatic `sizes` calculation
* 🎨 Blur-up placeholder support
* 📏 CLS prevention using `aspect-ratio`
* ⚙️ Dependency-free
* 🌍 Framework agnostic

Works with:

* Vanilla JavaScript
* WordPress
* Static websites
* Custom CMS

> **Note**
>
> Vue, Nuxt, React, Next.js and other JavaScript framework integrations are currently being tested and are considered experimental in this release.

---

## Installation

```bash
npm install lazy-srcset
```

---

## Basic Usage

### JavaScript

```javascript
import { lazySrcset } from 'lazy-srcset'

lazySrcset()
```

### HTML

```html
<img
	class="lazy-srcset"
	data-src="/images/porsche911/porsche911.jpg"
	alt="Porsche 911"
/>
```

That's it.

The library automatically:

* Generates a placeholder image
* Generates `srcset`
* Calculates `sizes`
* Applies lazy loading
* Applies async decoding
* Prevents CLS
* Loads the image before it enters the viewport

No manual `src`, `srcset`, or `sizes` configuration is required.

---

## How It Works

1. Add only the original image path using `data-src`.

```html
<img
	class="lazy-srcset"
	data-src="/images/porsche911/porsche911.jpg"
	alt="Porsche 911"
/>
```

2. Generate resized image versions using the naming convention:

```text
image-320.jpg
image-480.jpg
image-640.jpg
image-768.jpg
image-1024.jpg
image-1280.jpg
image-1440.jpg
image-1920.jpg
```

3. The library automatically:

* Detects the image format
* Generates a placeholder image
* Generates a responsive `srcset`
* Calculates the optimal `sizes`
* Loads images before they enter the viewport

4. The browser automatically downloads the most appropriate image size for the current device.

---

## Image Preparation

Create resized image versions using the following pattern:

```text
/path/to/image-{breakpoint}.{extension}
```

All image files should be stored in the same directory.

Example:

```text
/images/porsche911/

porsche911.jpg
porsche911-320.jpg
porsche911-480.jpg
porsche911-640.jpg
porsche911-768.jpg
porsche911-1024.jpg
porsche911-1280.jpg
porsche911-1440.jpg
porsche911-1920.jpg
```

WebP example:

```text
/images/porsche911/

porsche911.webp
porsche911-320.webp
porsche911-480.webp
porsche911-640.webp
porsche911-768.webp
porsche911-1024.webp
porsche911-1280.webp
porsche911-1440.webp
porsche911-1920.webp
```

AVIF example:

```text
/images/porsche911/

porsche911.avif
porsche911-320.avif
porsche911-480.avif
porsche911-640.avif
porsche911-768.avif
porsche911-1024.avif
porsche911-1280.avif
porsche911-1440.avif
porsche911-1920.avif
```

---

## Default Breakpoints

```javascript
[
	320,
	480,
	640,
	768,
	1024,
	1280,
	1440,
	1920
]
```

| Name     | Width | Typical Device                        |
| -------- | ----- | ------------------------------------- |
| minimum  | 320w  | Small mobile phones                   |
| improved | 480w  | Standard mobile phones                |
| normal   | 640w  | Large mobile phones                   |
| middle   | 768w  | Tablets (portrait)                    |
| good     | 1024w | Tablets (landscape) and small laptops |
| super    | 1280w | Laptops and medium screens            |
| maximum  | 1440w | Large laptops and desktop monitors    |
| full     | 1920w | Full HD desktop displays              |

---

## Supported Formats

The library automatically detects the file format from the `data-src` attribute.

Supported formats:

* JPG
* JPEG
* WebP
* AVIF
* PNG

Example:

```html
<img
	class="lazy-srcset"
	data-src="/images/photo/photo.jpg"
	alt=""
/>

<img
	class="lazy-srcset"
	data-src="/images/banner/banner.webp"
	alt=""
/>

<img
	class="lazy-srcset"
	data-src="/images/hero/hero.avif"
	alt=""
/>
```

Each image can use its own format.

No additional configuration is required.

---

## Configuration

```javascript
import { lazySrcset } from 'lazy-srcset'

lazySrcset({
	preloadScreens: 2,
	aspectRatio: '16 / 9'
})
```

### Options

```javascript
lazySrcset({
	breakpoints: [320, 480, 640, 768, 1024, 1280, 1440, 1920],

	autoPlaceholder: true,

	selector: '.lazy-srcset',
	root: null,
	preloadScreens: 2,
	threshold: 0,

	loadedClass: 'is-loaded',
	errorClass: 'is-error',
	loadingClass: 'is-loading',
	blurClass: 'is-blur',

	autoInit: false,

	decoding: 'async',
	loading: 'lazy',

	setAspectRatio: true,
	aspectRatio: '16 / 9',

	autoSizes: true,
	defaultSizes: '100vw'
})
```

| Option          | Type           | Default                               | Description                                                   |
| --------------- | -------------- | ------------------------------------- | ------------------------------------------------------------- |
| breakpoints     | number[]       | [320,480,640,768,1024,1280,1440,1920] | Responsive image widths used for automatic srcset generation. |
| autoPlaceholder | boolean        | true                                  | Automatically generates a low-resolution placeholder image.   |
| selector        | string         | .lazy-srcset                          | CSS selector used to find images.                             |
| root            | Element | null | null                                  | Custom IntersectionObserver root element.                     |
| preloadScreens  | number         | 2                                     | Number of viewport heights before loading begins.             |
| threshold       | number         | 0                                     | IntersectionObserver visibility threshold.                    |
| loadedClass     | string         | is-loaded                             | Class applied after successful image loading.                 |
| errorClass      | string         | is-error                              | Class applied when image loading fails.                       |
| loadingClass    | string         | is-loading                            | Class applied while an image is loading.                      |
| blurClass       | string         | is-blur                               | Class applied before image loading completes.                 |
| autoInit        | boolean        | false                                 | Automatically initialize after DOMContentLoaded.              |
| decoding        | string         | async                                 | Native image decoding strategy.                               |
| loading         | string         | lazy                                  | Native browser loading strategy.                              |
| setAspectRatio  | boolean        | true                                  | Apply CSS aspect-ratio automatically.                         |
| aspectRatio     | string         | 16 / 9                                | Aspect ratio used when setAspectRatio is enabled.             |
| autoSizes       | boolean        | true                                  | Automatically calculate the optimal sizes attribute.          |
| defaultSizes    | string         | 100vw                                 | Fallback sizes value.                                         |

---

## Core Web Vitals Optimizations

lazy-srcset automatically applies:

* Native `loading="lazy"`
* Native `decoding="async"`
* Responsive image selection with `srcset`
* Automatic `sizes` calculation
* Automatic placeholder generation
* Optional `aspect-ratio` support
* CLS prevention

These optimizations help improve:

* Lighthouse Performance
* Largest Contentful Paint (LCP)
* Cumulative Layout Shift (CLS)
* Mobile PageSpeed Insights scores

---

## Browser Support

Supports all modern browsers that implement:

* IntersectionObserver
* srcset
* sizes

Fallback behavior:

* No IntersectionObserver → images load immediately
* No srcset support → browser falls back to the placeholder image

---

## CSS Example

```css
.lazy-srcset {
	opacity: 0;
	filter: blur(10px);
	transform: scale(1.02);
	transition:
		opacity 0.3s ease,
		filter 0.3s ease,
		transform 0.3s ease;
}

.lazy-srcset.is-loaded {
	opacity: 1;
	filter: blur(0);
	transform: scale(1);
}
```

---

## License

MIT
