const getResult = async (list: string[], selected: number[]) => {
  let result: string[] | string = [];

  for (let i = 0; i < selected.length; i++) {
    result.push(list[selected[i]]);
  }
  return result.join(",");
};

const shuffle = (list: string[]) => {
  let currentIndex = list.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [list[currentIndex], list[randomIndex]] = [
      list[randomIndex],
      list[currentIndex],
    ];
  }

  return list;
};

const check = (num: number) => {
  return Math.log2(num) % 1 === 0 && num >= 8 ? true : false;
};

export { getResult, shuffle, check };
