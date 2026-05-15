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
      text: "She gave me careful advice before the interview.",
    },
    {
      id: "advice-example-2",
      text: "I need your advice before I send the email.",
    },
  ],
  difficulty: "easy",
  frequencyLabel: "Top 500",
  tags: ["communication", "daily life"],
  status: "learning",
};
