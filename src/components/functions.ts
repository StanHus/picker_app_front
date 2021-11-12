const getResult = async (list: string[], selected: number[]) => {
  let result: string[] | string = [];

  for (let i = 0; i < selected.length; i++) {
    result.push(list[selected[i]]);
  }
  return result.join(",");
};

export { getResult };
