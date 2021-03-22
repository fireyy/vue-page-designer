export default (tpl, data) => {
  if (!data) return tpl

  const re = new RegExp('{(.*?)}', 'g')

  return tpl.replace(re, (_, key) => {
    let ret = data

    for (const prop of key.split('.')) {
      ret = ret ? ret[prop] : ''
    }

    return ret || ''
  })
}
