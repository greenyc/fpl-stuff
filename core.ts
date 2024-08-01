import type { Team, TeamGroup } from "./types";
import { log } from "./utils";

// TODO: Type this properly using generics
export const nChooseK = (arr: any, k: number, prefix: any = []) => {
  if (k == 0) return [prefix];
  return arr.flatMap((v: any, i: number) =>
    nChooseK(arr.slice(i + 1), k - 1, [...prefix, v])
  );
};

export const getTeamGroups = (teamCombos: Team[][]) => {
    let teamGroups: TeamGroup[] = [];
    teamCombos.forEach((teamCombo: Team[]) => {
      teamGroups.push({
        teams: teamCombo,
        score: 0,
        bestGameweekTeam: [],
      });
    });
  
    if (global.debug && (!teamGroups || teamGroups.length === 0)) {
      log("No team groups.");
    }
  
    return teamGroups;
  };