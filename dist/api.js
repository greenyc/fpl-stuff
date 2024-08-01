"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFixtures = getFixtures;
exports.getTeams = getTeams;
const consts_1 = require("./consts");
async function getFixtures() {
    const res = await fetch(consts_1.FIXTURES_URL);
    const json = await res.json();
    return json;
}
async function getTeams() {
    const res = await fetch(consts_1.BOOTSTRAP_URL);
    const json = await res.json();
    return json.teams;
}
//# sourceMappingURL=api.js.map