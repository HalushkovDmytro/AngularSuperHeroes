export interface UsersData {
  email: string;
  password: string;
  userName: string;
}
export interface HeroInfo {
  id: string;
  name: string;
  image: string;
  powerstats: PowerStats;
}

export interface PowerStats {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}

export interface PowerUp {
  title: string;
  powerStatsName: string;
  powerStatsValue: string;
  usesLeft: number;
  image: string;
  selected: boolean;
}

export interface BattleInfo {
  battleDate: any;
  heroName: string;
  heroId: string;
  enemyName: string;
  enemyId: string;
  battleResult: string;
}

export interface BattleScore {
  usersScore: number;
  enemyScore: number;
}

export interface Response {
  response: string;
  error?: string;
  results: FetchResult[];
}

export interface FetchResult {
  id: string;
  name: string;
  image: string;
  appearance: Appearance;
  biography: Biography;
  connections: Connections;
  powerstats: PowerStats;
  work: Work;
}

export interface Appearance {
  gender: string;
  height: string;
  race: string;
  weight: string;
}

export interface Biography {
  alignment: string;
  "alter-egos": string;
  "full-name": string;
  "place-of-birth": string;
}

export interface Connections {
  "group-affiliation": string;
  relatives: string[] | string | null;
}

export interface Work {
  occupations: string;
  base: string;
}
