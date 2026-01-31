import { describe, expect, it } from "vitest";
import {
  calculateMatchPoints,
  calculateContextBonus,
  calculateDurationBonus
} from "../lib/points-calculator";

const baseMatch = {
  id: "match-1",
  rating: 4,
  durationMinutes: 22,
  isTitleMatch: true,
  titleLevel: "world" as const,
  isMainEvent: true,
  isSpecialStipulation: false,
  participants: []
};

describe("points calculator", () => {
  it("adds context and duration bonus once per player", () => {
    const match = {
      ...baseMatch,
      participants: [
        { wrestlerId: "a", isWinner: true, victoryType: "pin" as const },
        { wrestlerId: "b", isWinner: false }
      ]
    };

    const lineup = {
      starterIds: ["a", "b"],
      activeReserveIds: [],
      captainId: "a"
    };

    const points = calculateMatchPoints(match, lineup);

    expect(points).toHaveLength(2);
    expect(points[0].contextBonus).toBe(7);
    expect(points[0].durationBonus).toBe(3);
    expect(points[1].contextBonus).toBe(0);
    expect(points[1].durationBonus).toBe(0);
  });

  it("calculates context bonus per rules", () => {
    expect(calculateContextBonus(baseMatch)).toBe(7);
  });

  it("calculates duration bonus per rules", () => {
    expect(calculateDurationBonus(14)).toBe(0);
    expect(calculateDurationBonus(15)).toBe(2);
    expect(calculateDurationBonus(25)).toBe(3);
    expect(calculateDurationBonus(31)).toBe(4);
  });
});
