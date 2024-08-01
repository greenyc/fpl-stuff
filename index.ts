global.debug = true;
import chunk from "lodash.chunk";
import type { Fixture, Team, TeamGroup } from "./types";
import { getFixtures, getTeams } from "./api";
import { log, logTime } from "./utils";
import { getTeamGroups, nChooseK, printResults } from "./core";

// TODO: Add GW to start on
const GW_GROUP_SIZE = 6;
const MIN_SCORE = 2;
const NUM_TEAMS_IN_GROUP = 1;

(async () => {
  if (global.debug) {
    log("Start:");
    logTime("start");
  }

  const teams = await getTeams() as Team[];
  const fixtures = await getFixtures();

  const startingGw = 0;
  const endingGw = 38;

  let teamCombos = nChooseK(teams, NUM_TEAMS_IN_GROUP) as Team[][];

  for (
    let gwIndex = startingGw;
    gwIndex <= endingGw - GW_GROUP_SIZE;
    gwIndex++
  ) {
    const chunkedFixtures = chunk(fixtures, 10) as Fixture[][];
    const consideredFixtures = chunkedFixtures.slice(
      gwIndex,
      gwIndex + GW_GROUP_SIZE
    );

    let teamGroups = getTeamGroups(teamCombos);

    teamGroups.forEach((teamGroup: TeamGroup) => {
      consideredFixtures.forEach((fixtureGroup: Fixture[]) => {
        // TODO: initialise these as null and then set them when we have them
        let score = 999;
        let result = "NO RESULT";
        let teamStrength = 0;

        teamGroup.teams.forEach((team) => {
          const game = fixtureGroup.find(
            (fixture) =>
              fixture.team_a === team.id || fixture.team_h === team.id
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

    printResults(teamGroups, MIN_SCORE, gwIndex, GW_GROUP_SIZE)
  }

  if (global.debug) {
    logTime("end");
    log("Finish.");
  }
})();
