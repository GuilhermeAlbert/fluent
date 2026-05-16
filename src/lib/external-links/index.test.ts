import { describe, expect, it } from "vitest";
import { externalLinks } from "./index";

describe("external links", () => {
  it("exposes the public GitHub repository URL", () => {
    expect(externalLinks.githubRepository).toBe(
      "https://github.com/GuilhermeAlbert/fluent",
    );
  });
});
