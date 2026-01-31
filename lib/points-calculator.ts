import type { TitleLevel, VictoryType } from "@/types/match";
import type { PlayerMatchPoints, PointsBreakdown } from "@/types/points";

export interface MatchContext {
  rating: number;
  durationMinutes: number;
  isTitleMatch: boolean;
  titleLevel?: TitleLevel | null;
  isMainEvent: boolean;
  isSpecialStipulation: boolean;
}

export interface ParticipantInput {
  wrestlerId: string;
  userId: string;
  isWinner: boolean;
  victoryType: VictoryType;
  bonusDebut: boolean;
  bonusReturn: boolean;
  bonusTitleDefense: boolean;
  malusBotch: boolean;
  malusShortMatch: boolean;
  malusSquashLoss: boolean;
  isCaptain: boolean;
}

const victoryBonusMap: Record<VictoryType, number> = {
  dq: 0.5,
  co: 0.5,
  pin: 1,
  sub: 1.5,
  ko: 2,
  no_contest: 0,
  none: 0
};

function getContextBonus(match: MatchContext): number {
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

function getDurationBonus(durationMinutes: number): number {
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

function getNarrativeBonus(participant: ParticipantInput): number {
  let bonus = 0;
  if (participant.bonusDebut || participant.bonusReturn) {
    bonus += 2;
  }
  if (participant.bonusTitleDefense) {
    bonus += 1;
  }
  return bonus;
}

function getMalus(participant: ParticipantInput): number {
  let malus = 0;
  if (participant.malusBotch) {
    malus -= 2;
  }
  if (participant.malusShortMatch) {
    malus -= 2;
  }
  if (participant.malusSquashLoss) {
    malus -= 2;
  }
  return malus;
}

function applyCaptainMultiplier(points: number, isCaptain: boolean): number {
  return isCaptain ? points * 1.5 : points;
}

function buildBreakdown(
  participant: ParticipantInput,
  basePoints: number,
  victoryBonus: number,
  contextBonus: number,
  durationBonus: number
): PointsBreakdown {
  const narrativeBonus = getNarrativeBonus(participant);
  const malus = getMalus(participant);
  const subtotal =
    basePoints + victoryBonus + contextBonus + durationBonus + narrativeBonus + malus;
  const captainMultiplier = participant.isCaptain ? 1.5 : 1;
  const totalPoints = subtotal;

  return {
    basePoints,
    victoryBonus,
    contextBonus,
    durationBonus,
    narrativeBonus,
    malus,
    captainMultiplier,
    totalPoints
  };
}

export function calculateMatchPoints(
  match: MatchContext,
  participants: ParticipantInput[]
): PlayerMatchPoints[] {
  const basePoints = Math.max(0, Math.min(match.rating, 5)) * 2;
  const contextBonus = getContextBonus(match);
  const durationBonus = getDurationBonus(match.durationMinutes);

  const participantsByUser = participants.reduce<Record<string, ParticipantInput[]>>(
    (acc, participant) => {
      acc[participant.userId] = acc[participant.userId] ?? [];
      acc[participant.userId].push(participant);
      return acc;
    },
    {}
  );

  return participants.map((participant) => {
    const rosterEntries = participantsByUser[participant.userId] ?? [participant];
    const sharedContextBonus =
      rosterEntries.length > 0 ? contextBonus / rosterEntries.length : 0;
    const sharedDurationBonus =
      rosterEntries.length > 0 ? durationBonus / rosterEntries.length : 0;

    const victoryBonus = participant.isWinner
      ? victoryBonusMap[participant.victoryType]
      : 0;

    const breakdown = buildBreakdown(
      participant,
      basePoints,
      victoryBonus,
      sharedContextBonus,
      sharedDurationBonus
    );

    return {
      wrestlerId: participant.wrestlerId,
      breakdown: {
        ...breakdown,
        totalPoints: applyCaptainMultiplier(breakdown.totalPoints, participant.isCaptain)
      }
    };
  });
}
