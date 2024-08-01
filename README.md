Bootstrap API: `https://fantasy.premierleague.com/api/bootstrap-static/`
Fixture API: `https://fantasy.premierleague.com/api/fixtures/?future=1`

Bootstrap response.teams is an array of 20 objs with this shape:
```
{
  "code": 3, // Ignore
  "draw": 0, // Ignore
  "form": null, // Ignore
  "id": 1, // ID
  "loss": 0, // Ignore
  "name": "Arsenal", // Name
  "played": 0, // Ignore
  "points": 0, // Ignore
  "position": 0, // Ignore
  "short_name": "ARS", // Ignore
  "strength": 5, // Ignore
  "team_division": null, // Ignore
  "unavailable": false, // Ignore
  "win": 0, // Ignore
  "strength_overall_home": 1350, // Ignore
  "strength_overall_away": 1380, // Ignore
  "strength_attack_home": 1370, // Ignore
  "strength_attack_away": 1370, // Ignore
  "strength_defence_home": 1330, // Ignore
  "strength_defence_away": 1390, // Ignore
  "pulse_id": 1 // Ignore
}
```

All this is used for is mapping `team_a` or `team_h` to a human name

Fixture shape:
```
[0]: {
  code: 2444470, // Ignore
  event: 1, // 0-9 GW1, 10-19 GW2, etc
  finished: false, // Ignore
  finished_provisional: false, // Ignore
  id: 1, // Ignore
  kickoff_time: '2024-08-16T19:00:00Z', // Ignore
  minutes: 0, // Ignore
  provisional_start_time: false, // Ignore
  started: false, // Ignore
  team_a: 9,
  team_a_score: null, // Ignore
  team_h: 14,
  team_h_score: null, // Ignore
  stats: [], // Ignore
  team_h_difficulty: 2,
  team_a_difficulty: 3,
  pulse_id: 115827 // Ignore
}

[1]: {
  code: 2444473,
  event: 1,
  finished: false,
  finished_provisional: false,
  id: 4,
  kickoff_time: '2024-08-17T11:30:00Z',
  minutes: 0,
  provisional_start_time: false,
  started: false,
  team_a: 12,
  team_a_score: null,
  team_h: 10,
  team_h_score: null,
  stats: [],
  team_h_difficulty: 4,
  team_a_difficulty: 2,
  pulse_id: 115830
}
```

n choose k = n!/(k!(n-k)!)
Singles = 20!/1!(19)! = 20 singles
Doubles = 20!/2!(18)! = 190 pairs
Triples = 20!/3!(17)! = 1140 triples
Quads = 20!/4!(16)! = 4845 quads
Quints = 20!/5!(15)! = 15504 quints