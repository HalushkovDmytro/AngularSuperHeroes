export interface UsersData {
  email: string;
  password: string;
  userName: string;
}
export interface HeroInfo {
  id: string,
  name: string,
  image: string,
  powerStats: PowerStats,
}

export interface PowerStats {
  intelligence: string,
  strength: string,
  speed: string,
  durability: string,
  power: string,
  combat: string,
}



