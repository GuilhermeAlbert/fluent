import { describe, expect, it } from "vitest";
import { getHomeWords } from "./index";

describe("getHomeWords", () => {
  it("returns English home words for english learning", () => {
    const words = getHomeWords("english", true);

    expect(words.some((word) => word.word === "Advice")).toBe(true);
    expect(words.some((word) => word.word === "Rest")).toBe(true);
  });

  it("returns Spanish home words for spanish learning", () => {
    const words = getHomeWords("spanish", true);

    expect(words.length).toBeGreaterThanOrEqual(10);
    expect(words.some((word) => word.word === "República")).toBe(true);
  });
});
