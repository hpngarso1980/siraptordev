export default function removeItem(list, removedItem) {
  return list.filter(item => item !== removedItem);
}
