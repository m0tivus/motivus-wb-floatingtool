function loadScript(url, callback) {
  var script = document.createElement('script')
  script.async = true
  script.src = url
  var entry = document.getElementsByTagName('script')[0]
  entry.parentNode.insertBefore(script, entry)

  script.onload = script.onreadystatechange = function () {
    var rdyState = script.readyState

    if (!rdyState || /complete|loaded/.test(script.readyState)) {
      callback()
      script.onload = null
      script.onreadystatechange = null
    }
  }
}
function loadStylesheet(url) {
  var link = document.createElement('link')
  link.rel = 'stylesheet'
  link.type = 'text/css'
  link.href = url
  var entry = document.getElementsByTagName('script')[0]
  entry.parentNode.insertBefore(link, entry)
}

function onCssReady(callback) {
  var testElem = document.createElement('span')
  testElem.id = 'motivus-css-ready'
  testElem.style = 'color: #fff'
  var entry = document.getElementsByTagName('script')[0]
  entry.parentNode.insertBefore(testElem, entry)
  ;(function poll() {
    var node = document.getElementById('motivus-css-ready')
    var value
    if (window.getComputedStyle) {
      value = document.defaultView
        .getComputedStyle(testElem, null)
        .getPropertyValue('color')
    } else if (node.currentStyle) {
      value = node.currentStyle.color
    }
    if (
      (value && value === 'rgb(186, 218, 85)') ||
      value.toLowerCase() === '#bada55'
    ) {
      callback()
    } else {
      setTimeout(poll, 500)
    }
  })()
}

// eslint-disable-next-line no-extra-semi
;(function (window, undefined) {
  loadStylesheet('https://widget.motivus.cl/css/main.css')
  onCssReady(() => {
    loadScript('https://widget.motivus.cl/js/main.js', () => null)
  })
})(this)
