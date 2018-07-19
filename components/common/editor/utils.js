export function isParent(par, el) {
  if (par == el) return true
  let parNode = el.parentNode
  while (parNode) {
    if (parNode == par) return true
    parNode = parNode.parentNode
  }
  return false
}