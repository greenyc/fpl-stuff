global.debug = true;
import chunk from "lodash.chunk";
import cloneDeep from "lodash.clonedeep";
import type { Fixture, Team, TeamGroup } from "./types";
import { getFixtures, getTeams } from "./api";
import { log, logTime } from "./utils";
import { getTeamGroups, nChooseK } from "./core";

// TODO: Add GW to start on
const GW_CONSIDERED = 6;
const MIN_SCORE = 2;
const NUM_TEAMS_IN_GROUP = 1;
const PRINT_GAMES = true;

(async () => {
  if (global.debug) {
    log("Start:");
    logTime("start");
  }

  const originalTeams = await getTeams();
  const fixtures = await getFixtures();

  const startingGw = 0;
  const endingGw = 38;

  for (
    let gwIndex = startingGw;
    gwIndex <= endingGw - GW_CONSIDERED;
    gwIndex++
  ) {
    const chunkedFixtures = chunk(fixtures, 10) as Fixture[][];
    const consideredFixtures = chunkedFixtures.slice(
      gwIndex,
      gwIndex + GW_CONSIDERED
    );

    let teams = cloneDeep(originalTeams) as Team[];
    let teamCombos = nChooseK(teams, NUM_TEAMS_IN_GROUP) as Team[][];

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

    teamGroups.forEach((teamGroup: TeamGroup) => {
      if (teamGroup.score && teamGroup.score <= MIN_SCORE * GW_CONSIDERED) {
        const teamNames = teamGroup.teams.map((x) => x.name);
        // if always one team picked, can we exclude the other team? how do we then remove dupe groups
        // e.g. at GW 2, chels+spurs, chels+man_u => chels, chels so will appear twice, use set on final results?
        log(
          `Team group containing ${teamNames.join(", ")} run starting on GW${
            gwIndex + 1
          }.`
        );

        if (PRINT_GAMES) {
          teamGroup.bestGameweekTeam.forEach((gameweekResult) => {
            log(gameweekResult);
          });
          log("---");
        }
      }
    });
  }

  if (global.debug) {
    logTime("end");
    log("Finish.");
  }
})();
