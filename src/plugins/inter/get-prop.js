function getPathSegments (path) {
  const pathArr = path.split('.')
  const parts = []

  for (let i = 0; i < pathArr.length; i++) {
    let p = pathArr[i]

    while (p[p.length - 1] === '\\' && pathArr[i + 1] !== undefined) {
      p = p.slice(0, -1) + '.'
      p += pathArr[++i]
    }

    parts.push(p)
  }

  return parts
}

export default function (data, path) {
  return getPathSegments(path).reduce((obj, k) => obj && obj[k], data)
}
