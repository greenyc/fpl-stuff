export const log = (message: string) => {
  console.log(message);
};

export const logTime = (type: "start" | "end") => {
  if (type === "start") console.time();
  if (type === "end") console.timeEnd();
};

// Type this properly using generics
export const nChooseK = (arr: any, k: number, prefix: any = []) => {
  if (k == 0) return [prefix];
  return arr.flatMap((v: any, i: number) =>
    nChooseK(arr.slice(i + 1), k - 1, [...prefix, v])
  );
};
