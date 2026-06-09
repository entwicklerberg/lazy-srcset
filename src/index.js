const defaults = {
    breakpoints: [320, 480, 640, 768, 1024, 1280, 1440, 1920],

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
}

function parseImagePath(src) {
    const cleanSrc = src.split('?')[0]
    const query = src.includes('?') ? `?${src.split('?')[1]}` : ''

    const lastDotIndex = cleanSrc.lastIndexOf('.')

    if (lastDotIndex === -1) {
        return {
            basePath: cleanSrc,
            extension: null,
            query
        }
    }

    return {
        basePath: cleanSrc.slice(0, lastDotIndex),
        extension: cleanSrc.slice(lastDotIndex + 1),
        query
    }
}

function generateSrcset(src, breakpoints) {
    const {basePath, extension, query} = parseImagePath(src)

    if (!extension) return ''

    return breakpoints
        .map((width) => {
            return `${basePath}-${width}.${extension}${query} ${width}w`
        })
        .join(', ')
}

export function lazySrcset(options = {}) {
    const settings = {
        ...defaults,
        ...options
    }

    const images = document.querySelectorAll(settings.selector)

    const prepareImage = (img) => {
        if (!img.getAttribute('src')) {
            console.warn(
                '[lazySrcset] Attribute "src" is required and should contain the smallest image.',
                img
            )
        }

        if (!img.dataset.srcset) {
            console.warn(
                '[lazySrcset] Attribute "data-srcset" is required and should contain the largest image.',
                img
            )
        }

        if (settings.decoding) {
            img.setAttribute('decoding', settings.decoding)
        }

        if (settings.loading) {
            img.setAttribute('loading', settings.loading)
        }

        if (settings.setAspectRatio) {
            img.style.aspectRatio = settings.aspectRatio
        }

        img.classList.add(settings.blurClass)
    }

    const setImageSizes = (img) => {
        if (img.dataset.sizes) {
            img.sizes = img.dataset.sizes
            return
        }

        if (settings.autoSizes) {
            const width = img.offsetWidth

            if (width > 0) {
                img.sizes = `${Math.ceil(width)}px`
                return
            }
        }

        img.sizes = settings.defaultSizes
    }

    const loadImage = (img) => {
        img.classList.add(settings.loadingClass)

        setImageSizes(img)

        if (img.dataset.srcset) {
            img.srcset = generateSrcset(
                img.dataset.srcset,
                settings.breakpoints
            )
        }

        img.onload = () => {
            img.classList.remove(settings.loadingClass)
            img.classList.remove(settings.blurClass)
            img.classList.add(settings.loadedClass)
        }

        img.onerror = () => {
            img.classList.remove(settings.loadingClass)
            img.classList.add(settings.errorClass)
        }
    }

    images.forEach(prepareImage)

    if (!('IntersectionObserver' in window)) {
        images.forEach(loadImage)
        return null
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return

            loadImage(entry.target)
            observer.unobserve(entry.target)
        })
    }, {
        root: settings.root,
        rootMargin: `${settings.preloadScreens * 100}% 0px`,
        threshold: settings.threshold
    })

    images.forEach((img) => {
        observer.observe(img)
    })

    return observer
}