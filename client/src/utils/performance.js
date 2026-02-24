/**
 * Performance Monitoring Utilities
 * Tracks Core Web Vitals and reports performance metrics
 */

// Report Web Vitals to console (can be sent to analytics)
export function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

// Measure component render time
export function measureRender(componentName, callback) {
  const startTime = performance.now()
  callback()
  const endTime = performance.now()
  console.log(`${componentName} rendered in ${(endTime - startTime).toFixed(2)}ms`)
}

// Debounce function for performance optimization
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll/resize events
export function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Lazy load images with Intersection Observer
export function lazyLoadImage(img) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target
        lazyImage.src = lazyImage.dataset.src
        lazyImage.classList.remove('lazy')
        observer.unobserve(lazyImage)
      }
    })
  })
  observer.observe(img)
}

// Preload critical resources
export function preloadResource(href, as, type) {
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = as
  link.href = href
  if (type) link.type = type
  document.head.appendChild(link)
}
