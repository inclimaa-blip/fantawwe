export interface PointsBreakdown {
  basePoints: number;
  victoryBonus: number;
  contextBonus: number;
  durationBonus: number;
  narrativeBonus: number;
  malus: number;
  captainMultiplier: number;
  totalPoints: number;
}

export interface PlayerMatchPoints {
  wrestlerId: string;
  breakdown: PointsBreakdown;
}
