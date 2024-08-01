export const log = (message: string) => {
  console.log(message);
};

export const logTime = (type: "start" | "end") => {
  if (type === "start") console.time();
  if (type === "end") console.timeEnd();
};
