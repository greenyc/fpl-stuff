import type { Fixture, Team, TeamGroup } from "./types";
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

export const processFixtures = (
  teamGroups: TeamGroup[],
  consideredFixtures: Fixture[][],
  teams: Team[]
) => {
  teamGroups.forEach((teamGroup: TeamGroup) => {
    consideredFixtures.forEach((fixtureGroup: Fixture[]) => {
      // TODO: initialise these as null and then set them when we have them
      let score = 999;
      let result = "NO RESULT";
      let teamStrength = 0;

      teamGroup.teams.forEach((team) => {
        const game = fixtureGroup.find(
          (fixture) => fixture.team_a === team.id || fixture.team_h === team.id
        );

        if (global.debug && !game) log("Game not found");

        const isTeamAway = game?.team_a === team.id;
        const difficulty = isTeamAway
          ? game?.team_a_difficulty
          : game?.team_h_difficulty;
        const oppositionId = isTeamAway ? game?.team_h : game?.team_a;
        const fixtureText = isTeamAway ? "away against" : "at home against";
        const strength = isTeamAway
          ? team.strength_overall_away
          : team.strength_overall_home;

        if (difficulty && difficulty < score) {
          const oppositionTeam = teams.find((x) => x.id === oppositionId);
          score = difficulty;
          result = `${team.name} ${fixtureText} ${oppositionTeam?.name}.`;
        }

        if (difficulty === score && strength > teamStrength) {
          const oppositionTeam = teams.find((x) => x.id === oppositionId);
          result = `${team.name} ${fixtureText} ${oppositionTeam?.name}.`;
        }
      });

      teamGroup.score += score;
      teamGroup.bestGameweekTeam.push(result);
    });
  });

  return teamGroups;
};
