export function cumulativeOffset (element) {
  let top = 0
  let left = 0

  do {
    top += element.offsetTop || 0
    left += element.offsetLeft || 0
    element = element.offsetParent
  } while (element)

  return {
    top: top,
    left: left
  }
}

export function checkInView (el) {
  let rect = el.getBoundingClientRect()
  return (
    rect.top < window.innerHeight &&
    (rect.left < window.innerWidth &&
      rect.right > 0)
  )
}
