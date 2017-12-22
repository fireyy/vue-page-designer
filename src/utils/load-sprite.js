// Load a sprite
export default function (url, id) {
  var x = new XMLHttpRequest()

  // If the id is set and sprite exists, bail
  if (document.querySelector('#' + id)) {
    return
  }

  // Create placeholder (to prevent loading twice)
  var container = document.createElement('div')
  container.setAttribute('hidden', '')
  container.setAttribute('id', id)
  document.body.insertBefore(container, document.body.childNodes[0])

  // Check for CORS support
  if ('withCredentials' in x) {
    x.open('GET', url, true)
  } else {
    return
  }

  // Inject hidden div with sprite on load
  x.onload = function () {
    container.innerHTML = x.responseText
  }

  x.send()
}
