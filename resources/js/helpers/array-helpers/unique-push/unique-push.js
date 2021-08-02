export default function uniquePush(list, item) {
  const available = list.includes(item);

  if (available) return list;

  return list.concat(item);
}
