import type { HomeWordSeed } from "./types";

export const currentWordSeed: HomeWordSeed = {
  id: "advice",
  word: "Advice",
  partOfSpeech: "Noun",
  pronunciation: "/ədˈvaɪs/",
  meaning: "A suggestion or recommendation about what someone should do.",
  examples: [
    {
      id: "advice-example-1",
      text: "She gave me good advice.",
    },
    {
      id: "advice-example-2",
      text: "I need your advice.",
    },
    {
      id: "advice-example-3",
      text: "Let me give you some advice.",
    },
  ],
  note: {
    summary: "“Advice” is uncountable in English.",
    avoid: "an advice",
    use: "some advice",
  },
  difficulty: "easy",
  frequencyLabel: "Top 500",
  tags: ["communication", "daily-life"],
  status: "new",
};
