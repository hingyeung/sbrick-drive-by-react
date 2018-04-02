// a little function to help us with reordering the result
export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const insert = (list: any[], index: number, newItem: any) => {
  const head = list.slice(0, index);
  const tail = list.slice(index, list.length);
  return [...head, newItem, ...tail];
};