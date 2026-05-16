import { describe, expect, it } from "vitest";
import { getHomeWords } from "./index";

describe("getHomeWords", () => {
  it("returns English home words for english learning", () => {
    const words = getHomeWords("english", true);

    expect(words.some((word) => word.word === "Advice")).toBe(true);
    expect(words.some((word) => word.word === "Rest")).toBe(true);
  });

  it("returns learning words in a stable mixed order instead of alphabetic blocks", () => {
    const firstRun = getHomeWords("english", true).slice(0, 12);
    const secondRun = getHomeWords("english", true).slice(0, 12);
    const firstLetters = new Set(firstRun.map((word) => word.word.charAt(0).toLowerCase()));

    expect(firstRun.map((word) => word.id)).toEqual(secondRun.map((word) => word.id));
    expect(firstLetters.size).toBeGreaterThan(3);
    expect(firstRun.some((word) => word.word.charAt(0).toLowerCase() !== "a")).toBe(true);
  });

  it("adds dictionary-style pronunciation fallbacks to every English learning word", () => {
    const words = getHomeWords("english", true);

    expect(words.length).toBeGreaterThan(100);
    expect(
      words.every((word) => {
        const rawWordFallback = `/${word.word.toLocaleLowerCase()}/`;

        return (
          word.pronunciation.length > 0 &&
          /[ˈˌ]/.test(word.pronunciation) &&
          word.pronunciation !== rawWordFallback &&
          !word.pronunciation.includes("·")
        );
      }),
    ).toBe(true);
  });

  it("returns Spanish home words for spanish learning", () => {
    const words = getHomeWords("spanish", true);

    expect(words.length).toBeGreaterThanOrEqual(10);
    expect(words.some((word) => word.word === "República")).toBe(true);
  });
});
