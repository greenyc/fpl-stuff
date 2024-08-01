import { FIXTURES_URL, BOOTSTRAP_URL } from "./consts";
import { log } from "./utils";

export async function getFixtures() {
  const res = await fetch(FIXTURES_URL);
  const data = await res.json();
  
  if (global.debug && (!data || data.length === 0)) log("No fixtures");

  return data;
}

export async function getTeams() {
  const res = await fetch(BOOTSTRAP_URL);
  const data = await res.json();
  
  if (global.debug && (!data.teams || data.teams.length === 0)) log("No teams");

  return data.teams;
}