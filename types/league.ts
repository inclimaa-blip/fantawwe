export type LeagueStatus = "active" | "paused" | "archived";

export interface League {
  id: string;
  name: string;
  commissionerId: string;
  currentSeason: number;
  currentQuarter: number;
  status: LeagueStatus;
  createdAt: string;
}

export interface DraftBid {
  id: string;
  leagueId: string;
  season: number;
  quarter: number;
  wrestlerId: string;
  userId: string;
  bidAmount: number;
  isWinningBid: boolean;
  createdAt: string;
}
