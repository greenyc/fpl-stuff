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

export const printResults = (
  teamGroups: TeamGroup[],
  minScore: number,
  startingGw: number,
  gwConsidered: number
) => {
  teamGroups.forEach((teamGroup: TeamGroup) => {
    if (teamGroup.score && teamGroup.score <= minScore * gwConsidered) {
      const teamNames = teamGroup.teams.map((x) => x.name);

      // TODO: if always one team picked, can we exclude the other team? how do we then remove dupe groups
      // e.g. at GW 2, chels+spurs, chels+man_u => chels, chels so will appear twice, use set on final results?
      log(
        `Team group containing ${teamNames.join(", ")} run starting on GW${
          startingGw + 1
        }.`
      );

      teamGroup.bestGameweekTeam.forEach((gameweekResult) => {
        log(gameweekResult);
      });

      log("---");
    }
  });
};
