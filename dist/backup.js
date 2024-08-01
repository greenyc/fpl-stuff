"use strict";
// var chunk = require("lodash.chunk");
// import type { Fixture, TeamWithScore } from "./types";
// import { getFixtures, getTeams } from "./api";
// import { log, logTime } from "./utils";
Object.defineProperty(exports, "__esModule", { value: true });
// const DEBUG_MODE = true;
// let GW_CONSIDERED = 19;
// const MIN_SCORE = 2.5;
// // Entry
// (async () => {
//   if (DEBUG_MODE) log("Start:");
//   if (DEBUG_MODE) logTime("start");
//   const teams = await getTeams();
//   if (DEBUG_MODE && (!teams || teams.length === 0)) log("No teams.");
//   const fixtures = await getFixtures();
//   if (DEBUG_MODE && (!fixtures || fixtures.length === 0)) log("No fixtures.");
//   for (
//     let gwStartIndex = 1;
//     gwStartIndex <= 38 - GW_CONSIDERED;
//     gwStartIndex++
//   ) {
//     let chunkedFixtures = chunk(fixtures, 10);
//     chunkedFixtures = chunkedFixtures.slice(
//       gwStartIndex - 1,
//       gwStartIndex - 1 + GW_CONSIDERED
//     );
//     let teamsCopy = JSON.parse(JSON.stringify(teams)) as TeamWithScore[];
//     if (DEBUG_MODE && (!teamsCopy || teamsCopy.length === 0)) log("No copy.");
//     teamsCopy.forEach((team: TeamWithScore) => {
//       chunkedFixtures.forEach((fixtureGroup: Fixture[]) => {
//         const game = fixtureGroup.find(
//           (fixture) => fixture.team_a === team.id || fixture.team_h === team.id
//         );
//         if (DEBUG_MODE && !game) log("Game not found");
//         if (game?.team_a === team.id) {
//           team.score = team.score
//             ? team.score + game.team_a_difficulty
//             : game.team_a_difficulty;
//         }
//         if (game?.team_h === team.id) {
//           team.score = team.score
//             ? team.score + game.team_h_difficulty
//             : game.team_h_difficulty;
//         }
//       });
//     });
//     teamsCopy = teamsCopy.sort((a, b) => {
//       if (a.score && b.score && a.score > b.score) return 1;
//       if (a.score && b.score && a.score < b.score) return -1;
//       return 0;
//     });
//     teamsCopy.forEach((team: TeamWithScore) => {
//       if (team.score && team.score <= MIN_SCORE * GW_CONSIDERED) {
//         log(`${team.name} run starting on GW${gwStartIndex}`);
//       }
//     });
//   }
//   if (DEBUG_MODE) logTime("end");
//   if (DEBUG_MODE) log("Finish.");
// })();
//# sourceMappingURL=backup.js.map