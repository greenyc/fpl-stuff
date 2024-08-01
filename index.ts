var chunk = require("lodash.chunk");
import type { Fixture, Team, TeamGroup } from "./types";
import { getFixtures, getTeams } from "./api";
import { nChooseK, log, logTime } from "./utils";

const DEBUG_MODE = true;
const GW_CONSIDERED = 38;
const MIN_SCORE = 2.15;
const NUM_TEAMS_IN_GROUP = 2;
const PRINT_GAMES = true;

(async () => {
  if (DEBUG_MODE) log("Start:");
  if (DEBUG_MODE) logTime("start");

  const originalTeams = await getTeams();
  if (DEBUG_MODE && (!originalTeams || originalTeams.length === 0)) log("No teams.");

  const fixtures = await getFixtures();
  if (DEBUG_MODE && (!fixtures || fixtures.length === 0)) log("No fixtures.");

  for (
    let gwStartIndex = 0;
    gwStartIndex <= 38 - GW_CONSIDERED;
    gwStartIndex++
  ) {
    let chunkedFixtures = chunk(fixtures, 10);
    chunkedFixtures = chunkedFixtures.slice(
      gwStartIndex,
      gwStartIndex + GW_CONSIDERED
    );

    // START REFACTOR
    let teamGroups: TeamGroup[] = [];
    let teams = JSON.parse(JSON.stringify(originalTeams)) as Team[];

    let teamCombos = nChooseK(teams, NUM_TEAMS_IN_GROUP);

    teamCombos.forEach((teamCombo: Team[]) => {
      teamGroups.push({
        teams: teamCombo,
        score: 0,
        bestGameweekTeam: [],
      });
    });
    // END REFACTOR

    if (DEBUG_MODE && teamGroups.length === 0) log("No team groups.");

    teamGroups.forEach((teamGroup: TeamGroup) => {
      chunkedFixtures.forEach((fixtureGroup: Fixture[]) => {
        // Following 3 rows are arbitrary, there are better ways to do this
        let score = 999;
        let result = "NO RESULT";
        let teamStrength = 0;

        teamGroup.teams.forEach((team) => {
          const game = fixtureGroup.find(
            (fixture) =>
              fixture.team_a === team.id || fixture.team_h === team.id
          );

          if (DEBUG_MODE && !game) log("Game not found");

          if (game?.team_a === team.id) {
            if (game.team_a_difficulty < score) {
              const homeTeamId = game.team_h;
              const homeTeam = teams.find((x) => x.id === homeTeamId);
              score = game.team_a_difficulty;
              result = `${team.name} away against ${homeTeam?.name}.`;
            }

            if (
              game.team_a_difficulty === score &&
              team.strength_overall_away > teamStrength
            ) {
              const homeTeamId = game.team_h;
              const homeTeam = teams.find((x) => x.id === homeTeamId);
              result = `${team.name} away against ${homeTeam?.name}.`;
            }
          }

          if (game?.team_h === team.id) {
            if (game.team_h_difficulty < score) {
              const awayTeamId = game.team_a;
              const awayTeam = teams.find((x) => x.id === awayTeamId);
              score = game.team_h_difficulty;
              result = `${team.name} at home against ${awayTeam?.name}.`;
            }

            if (
              game.team_h_difficulty === score &&
              team.strength_overall_home > teamStrength
            ) {
              const awayTeamId = game.team_a;
              const awayTeam = teams.find((x) => x.id === awayTeamId);
              result = `${team.name} at home against ${awayTeam?.name}.`;
            }
          }
        });

        teamGroup.score += score;
        teamGroup.bestGameweekTeam.push(result);
      });
    });

    teamGroups = teamGroups.sort((a, b) => {
      if (a.score > b.score) return 1;
      if (a.score < b.score) return -1;
      return 0;
    });

    if (MIN_SCORE) {
      teamGroups.forEach((teamGroup: TeamGroup) => {
        if (teamGroup.score && teamGroup.score <= MIN_SCORE * GW_CONSIDERED) {
          const teamNames = teamGroup.teams.map((x) => x.name);
          // if always one team picked, can we exclude the other team? how do we then remove dupe groups
          // e.g. at GW 2, chels+spurs, chels+man_u => chels, chels so will appear twice, use set on final results?
          log(
            `Team group containing ${teamNames.join(", ")} run starting on GW${gwStartIndex + 1
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
    } else {
    }
  }

  if (DEBUG_MODE) logTime("end");
  if (DEBUG_MODE) log("Finish.");
})();
