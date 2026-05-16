import type { LearningLanguage } from "../../types/settings";
import type { VocabularyWord, WordDifficulty } from "../../types/word";

export interface MarkdownVocabularyWordInput {
  content: string;
  path: string;
}

type MarkdownModules = Record<string, string>;

interface MarkdownFrontmatter {
  difficulty?: string;
  frequency_rank?: string;
  language?: string;
  pronunciation?: string;
  tags?: string[];
  word?: string;
}

const validDifficulties = new Set<WordDifficulty>(["easy", "medium", "hard"]);

function titleCase(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function normalizeIdPart(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getLanguageFromPath(path: string): LearningLanguage | null {
  const match = path.match(/languages\/([^/]+)\//);

  if (match?.[1] === "english" || match?.[1] === "spanish") {
    return match[1];
  }

  return null;
}

function getLetterFromPath(path: string, word: string) {
  const match = path.match(/\/words\/([^/]+)\//);

  return match?.[1] ?? normalizeIdPart(word).charAt(0);
}

function splitFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    return { body: content, frontmatter: "" };
  }

  return {
    frontmatter: match[1] ?? "",
    body: match[2] ?? "",
  };
}

function parseFrontmatter(content: string): MarkdownFrontmatter {
  const lines = content.split("\n");
  const frontmatter: MarkdownFrontmatter = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const match = line.match(/^([A-Za-z_]+):\s*(.*)$/);

    if (!match) {
      continue;
    }

    const [, key, rawValue] = match;

    if (key === "tags") {
      if (rawValue.trim() === "[]") {
        frontmatter.tags = [];
        continue;
      }

      const tags: string[] = [];
      let nextIndex = index + 1;

      while (lines[nextIndex]?.startsWith("  - ")) {
        tags.push(lines[nextIndex].replace("  - ", "").trim());
        nextIndex += 1;
      }

      frontmatter.tags = tags;
      index = nextIndex - 1;
      continue;
    }

    if (
      key === "difficulty" ||
      key === "frequency_rank" ||
      key === "language" ||
      key === "pronunciation" ||
      key === "word"
    ) {
      frontmatter[key] = rawValue.trim();
    }
  }

  return frontmatter;
}

function getSection(body: string, title: string) {
  const match = body.match(new RegExp(`## ${title}\\n\\n([\\s\\S]*?)(?=\\n## |$)`, "i"));

  return match?.[1]?.trim() ?? "";
}

function getHeading(body: string) {
  return body.match(/^#\s+(.+)$/m)?.[1]?.trim();
}

function parseExamples(body: string, idPrefix: string) {
  return getSection(body, "Examples")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .slice(0, 3)
    .map((line, index) => ({
      id: `${idPrefix}-example-${index + 1}`,
      text: line.replace("- ", "").trim(),
    }));
}

function parseDifficulty(value: string | undefined, frequencyRank: string | undefined): WordDifficulty {
  if (value && validDifficulties.has(value as WordDifficulty)) {
    return value as WordDifficulty;
  }

  const rank = Number(frequencyRank);

  if (Number.isFinite(rank) && rank > 0) {
    if (rank <= 500) {
      return "easy";
    }

    if (rank <= 2000) {
      return "medium";
    }

    return "hard";
  }

  return "medium";
}

export function parseMarkdownVocabularyWord({
  content,
  path,
}: MarkdownVocabularyWordInput): VocabularyWord & { language: LearningLanguage } {
  const { body, frontmatter: rawFrontmatter } = splitFrontmatter(content);
  const frontmatter = parseFrontmatter(rawFrontmatter);
  const language = getLanguageFromPath(path) ?? (frontmatter.language as LearningLanguage) ?? "english";
  const wordSlug = path.split("/").pop()?.replace(/\.md$/, "") ?? frontmatter.word ?? "word";
  const word = titleCase(frontmatter.word || getHeading(body) || wordSlug);
  const id = `${language}-${normalizeIdPart(wordSlug)}`;
  const letter = getLetterFromPath(path, word);
  const meaning = getSection(body, "Meaning") || `${word} is ready to study.`;
  const examples = parseExamples(body, id);
  const notes = getSection(body, "Notes");
  const tags = Array.from(
    new Set([...(frontmatter.tags ?? []), language, letter].filter(Boolean)),
  );

  return {
    id,
    word,
    language,
    partOfSpeech: "Word",
    pronunciation: frontmatter.pronunciation || "",
    meaning,
    examples,
    note: {
      summary: notes || "No notes yet.",
      avoid: "",
      use: "",
    },
    difficulty: parseDifficulty(frontmatter.difficulty, frontmatter.frequency_rank),
    frequencyLabel: frontmatter.frequency_rank ? `#${frontmatter.frequency_rank}` : "Unranked",
    tags,
    status: "new",
  };
}

export function createVocabularyWordsFromMarkdownModules(
  modules: MarkdownModules,
  language: LearningLanguage,
): Array<VocabularyWord & { language: LearningLanguage }> {
  return Object.entries(modules)
    .map(([path, content]) => parseMarkdownVocabularyWord({ content, path }))
    .filter((word) => word.language === language)
    .sort((a, b) => a.word.localeCompare(b.word));
}
