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

loadScript('https://motivus-webpage.s3.amazonaws.com/main.js', () => null)
