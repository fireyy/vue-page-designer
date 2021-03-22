export default (tpl, data) => {
  if (!data) return tpl

  const re = /{(.*?)}/g

  return tpl.replace(re, (_, key) => {
    let ret = data

    key.split('.').forEach((prop) => {
      ret = ret ? ret[prop] : ''
    })

    return ret || ''
  })
}
