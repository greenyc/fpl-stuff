import { FIXTURES_URL, BOOTSTRAP_URL } from "./consts";

export async function getFixtures() {
  const res = await fetch(FIXTURES_URL);
  const json = await res.json();
  return json;
}

export async function getTeams() {
  const res = await fetch(BOOTSTRAP_URL);
  const json = await res.json();
  return json.teams;
}