import { describe, expect, it } from "vitest";
import { getHomeWords } from "./index";

describe("getHomeWords", () => {
  it("returns English home words for english learning", () => {
    const words = getHomeWords("english", true);

    expect(words[0].word).toBe("Advice");
    expect(words[0].examples[0]?.text).toContain("advice");
  });

  it("returns Spanish home words for spanish learning", () => {
    const words = getHomeWords("spanish", true);

    expect(words.length).toBeGreaterThanOrEqual(10);
    expect(words[0].word).toBe("Consejo");
    expect(words[0].examples[0]?.text).toContain("consejo");
  });
});
