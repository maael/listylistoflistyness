export default function (args, getExtended) {
  const target = args.pop()
  if (typeof target === 'function') return getExtended(target)
  return (targetClass) => getExtended(targetClass, ...[...args, target])
}
