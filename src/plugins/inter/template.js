export default (tpl, data) => {
  if (!data) return tpl

  const re = /{(.*?)}/g

  return tpl.replace(re, (_, key) => {
    let ret = data

    for (const prop of key.split('.')) {
      ret = ret ? ret[prop] : ''
    }

    return ret || ''
  })
}
