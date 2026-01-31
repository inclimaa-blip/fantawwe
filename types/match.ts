export type ShowType = "raw" | "smackdown" | "nxt" | "ppv" | "ple";
export type TitleLevel = "world" | "midcard" | "tag" | "women" | "other";
export type VictoryType = "pin" | "sub" | "dq" | "co" | "ko" | "no_contest" | "none";

export interface Show {
  id: string;
  name: string;
  eventDate: string;
  showType: ShowType;
  season: number;
  quarter: number;
  week: number;
}

export interface Match {
  id: string;
  showId: string;
  rating: number;
  durationMinutes: number;
  isTitleMatch: boolean;
  titleLevel?: TitleLevel | null;
  isMainEvent: boolean;
  isSpecialStipulation: boolean;
}

export interface MatchParticipant {
  id: string;
  matchId: string;
  wrestlerId: string;
  isWinner: boolean;
  victoryType: VictoryType;
  bonusDebut: boolean;
  bonusReturn: boolean;
  bonusTitleDefense: boolean;
  malusBotch: boolean;
  malusShortMatch: boolean;
  malusSquashLoss: boolean;
}
