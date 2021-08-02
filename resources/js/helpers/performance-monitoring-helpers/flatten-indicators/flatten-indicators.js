export default function flattenIndicators(items, level = 1) {
  const classes = {
    1: 'bg-gray-light font-weight-bold text-dark level-1',
    2: 'bg-gray-super-light font-weight-bold text-dark level-2',
    3: 'text-black-50 level-3',
  }
  let result = []

  items.forEach(item => {
    const { assessments, children, ...usedProperties } = item
    const itemClasses = classes[level] || ''

    result.push({
      ...usedProperties,
      assessments,
      has_children: children && !!children.length,
      _classes: itemClasses,
    })

    if (Array.isArray(children) && children.length > 0) {
      result = result.concat(flattenIndicators(children, level + 1))
    }
  })

  return result
}
