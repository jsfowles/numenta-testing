import browserSize from 'browser-size'
import url from 'url'

/**
 * Utils for the Clientside
 */


/**
 *
 */
export function getBrowserWidth() {
  if (global.window) {
    const {width} = browserSize()
    return width
  }
  return 640
}

/**
 *
 */
export function hasSessionStorage() {
  const {sessionStorage} = global.window
  const mod = '_'
  try {
    sessionStorage.setItem(mod, mod)
    sessionStorage.removeItem(mod)
    return true
  }
  catch (error) {
    return false
  }
}

/**
 *
 */
export function scrollToSection(element, pad = -60) {
  const {scroll, setTimeout} = global.window
  if (element && 'getBoundingClientRect' in element) {
    const {top} = element.getBoundingClientRect()
    if (top) {
      setTimeout(() => scroll(0, top + pad), 0)
    }
  }
}

/**
 *
 */
export function triggerGAnalyticsEvent(href) {
  if (!href) return

  const {ga} = global.window
  const uri = url.parse(href)

  // g-analytics universal tracking (non-pageview)
  if (uri.protocol === 'mailto:') {
    // mailto links
    const email = uri.href.match(/^mailto:(.*?)$/)[1]
    ga('send', 'event', 'Mailto', email)
  }
  else if (uri.hostname === 'numenta.com' || !uri.hostname) {
    // internal asset links
    const ext = uri.pathname.split(/\./).pop()
    if (ext === 'pdf') {
      ga('send', 'event', 'Download', ext, uri.href)
    }
  }
  else {
    // external link
    ga('send', 'event', 'Outbound', uri.host, uri.path)
  }
}
