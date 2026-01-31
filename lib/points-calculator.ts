export type VictoryType =
  | "pin"
  | "submission"
  | "ko"
  | "dq"
  | "countout"
  | "no_contest";

export type MatchParticipant = {
  wrestlerId: string;
  isWinner: boolean;
  victoryType?: VictoryType;
  hasDebutBonus?: boolean;
  hasTitleDefenseBonus?: boolean;
  hasBotchMalus?: boolean;
  hasShortMatchMalus?: boolean;
  hasSquashLossMalus?: boolean;
};

export type MatchContext = {
  id: string;
  rating: number;
  durationMinutes: number;
  isTitleMatch: boolean;
  titleLevel?: "world" | "other" | null;
  isMainEvent: boolean;
  isSpecialStipulation: boolean;
  participants: MatchParticipant[];
};

export type LineupContext = {
  starterIds: string[];
  activeReserveIds: string[];
  captainId?: string;
};

export type PointsBreakdown = {
  wrestlerId: string;
  matchId: string;
  basePoints: number;
  victoryBonus: number;
  contextBonus: number;
  durationBonus: number;
  narrativeBonus: number;
  malus: number;
  captainMultiplier: number;
  totalPoints: number;
};

const victoryBonusByType: Record<VictoryType, number> = {
  pin: 1,
  submission: 1.5,
  ko: 2,
  dq: 0.5,
  countout: 0.5,
  no_contest: 0
};

export function calculateContextBonus(match: MatchContext): number {
  let bonus = 0;
  if (match.isTitleMatch) {
    bonus += match.titleLevel === "world" ? 4 : 2;
  }
  if (match.isMainEvent) {
    bonus += 3;
  }
  if (match.isSpecialStipulation) {
    bonus += 2;
  }
  return bonus;
}

export function calculateDurationBonus(durationMinutes: number): number {
  if (durationMinutes >= 30) {
    return 4;
  }
  if (durationMinutes >= 20) {
    return 3;
  }
  if (durationMinutes >= 15) {
    return 2;
  }
  return 0;
}

export function getVictoryBonus(victoryType?: VictoryType): number {
  if (!victoryType) {
    return 0;
  }
  return victoryBonusByType[victoryType] ?? 0;
}

export function calculateMatchPoints(
  match: MatchContext,
  lineup: LineupContext
): PointsBreakdown[] {
  const activeIds = new Set([...lineup.starterIds, ...lineup.activeReserveIds]);
  const participantsInLineup = match.participants.filter((participant) =>
    activeIds.has(participant.wrestlerId)
  );

  if (participantsInLineup.length === 0) {
    return [];
  }

  const basePoints = match.rating * 2;
  const contextBonus = calculateContextBonus(match);
  const durationBonus = calculateDurationBonus(match.durationMinutes);

  const points = participantsInLineup.map((participant, index) => {
    const narrativeBonus =
      (participant.hasDebutBonus ? 2 : 0) +
      (participant.hasTitleDefenseBonus ? 1 : 0);

    const malus =
      (participant.hasBotchMalus ? -2 : 0) +
      (participant.hasShortMatchMalus ? -2 : 0) +
      (participant.hasSquashLossMalus ? -2 : 0);

    const victoryBonus = participant.isWinner
      ? getVictoryBonus(participant.victoryType)
      : 0;

    const captainMultiplier =
      participant.wrestlerId === lineup.captainId ? 1.5 : 1;

    const totalBeforeCaptain = basePoints + victoryBonus + narrativeBonus + malus;
    let totalPoints = totalBeforeCaptain * captainMultiplier;

    const breakdown: PointsBreakdown = {
      wrestlerId: participant.wrestlerId,
      matchId: match.id,
      basePoints,
      victoryBonus,
      contextBonus: 0,
      durationBonus: 0,
      narrativeBonus,
      malus,
      captainMultiplier,
      totalPoints
    };

    if (index === 0) {
      breakdown.contextBonus = contextBonus;
      breakdown.durationBonus = durationBonus;
      breakdown.totalPoints += contextBonus + durationBonus;
    }

    return breakdown;
  });

  return points;
}
