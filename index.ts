global.debug = true;
import chunk from "lodash.chunk";
import type { Fixture, Team } from "./types";
import { getFixtures, getTeams } from "./api";
import { startLogs, endLogs } from "./utils";
import { getTeamGroups, nChooseK, printResults, processFixtures } from "./core";

// TODO: Add GW to start on
const GW_RUN_SIZE = 6;
const MIN_SCORE = 2;
const NUM_TEAMS_IN_GROUP = 1;

(async () => {
  startLogs();

  const teams = (await getTeams()) as Team[];
  const fixtures = await getFixtures();

  const startingGw = 0;
  const endingGw = 38;

  let teamCombos = nChooseK(teams, NUM_TEAMS_IN_GROUP) as Team[][];

  for (let gwIndex = startingGw; gwIndex <= endingGw - GW_RUN_SIZE; gwIndex++) {
    const chunkedFixtures = chunk(fixtures, 10) as Fixture[][];
    const fixtureGroup = chunkedFixtures.slice(gwIndex, gwIndex + GW_RUN_SIZE);
    let teamGroups = getTeamGroups(teamCombos);
    teamGroups = processFixtures(teamGroups, fixtureGroup, teams);
    printResults(teamGroups, MIN_SCORE, gwIndex, GW_RUN_SIZE);
  }

  endLogs();
})();
