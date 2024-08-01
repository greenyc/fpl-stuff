export const log = (message: string) => {
  console.log(message);
};

export const logTime = (type: "start" | "end") => {
  if (type === "start") console.time();
  if (type === "end") console.timeEnd();
};

export const startLogs = () => {
  if (global.debug) {
    log("Start:");
    logTime("start");
  }
};

export const endLogs = () => {
  if (global.debug) {
    logTime("end");
    log("Finish.");
  }
};
