export type Fixture = {
  code: number;
  event: number;
  finished: Boolean;
  finished_provisional: Boolean;
  id: number;
  kickoff_time: string;
  minutes: number;
  provisional_start_time: Boolean;
  started: Boolean;
  team_a: number;
  team_a_score: number | null;
  team_h: number;
  team_h_score: number | null;
  stats: any[];
  team_h_difficulty: number;
  team_a_difficulty: number;
  pulse_id: number;
};

export type Team = {
  code: number;
  draw: number;
  form: number | null;
  id: number;
  loss: number;
  name: string;
  played: number;
  points: number;
  position: number;
  short_name: string;
  strength: number;
  team_division: number | null;
  unavailable: Boolean;
  win: number;
  strength_overall_home: number;
  strength_overall_away: number;
  strength_attack_home: number;
  strength_attack_away: number;
  strength_defence_home: number;
  strength_defence_away: number;
  pulse_id: number;
};

export type TeamGroup = {
    teams: Team[];
    score: number;
    bestGameweekTeam: string[];
}