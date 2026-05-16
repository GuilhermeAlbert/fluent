import type { FluentStorageData, StorageWordProgress } from "../storage/types";

export type HomeSessionSnapshot = Pick<
  FluentStorageData,
  "completedToday" | "currentWordIndex" | "dailyGoal" | "streak" | "wordProgress"
>;

export function createHomeSessionSnapshot(snapshot: HomeSessionSnapshot): HomeSessionSnapshot {
  return {
    completedToday: snapshot.completedToday,
    currentWordIndex: snapshot.currentWordIndex,
    dailyGoal: snapshot.dailyGoal,
    streak: snapshot.streak,
    wordProgress: { ...snapshot.wordProgress },
  };
}

function getNextWordIndex(currentWordIndex: number, dailyGoal: number) {
  if (dailyGoal <= 0) {
    return 0;
  }

  return (currentWordIndex + 1) % dailyGoal;
}

function createWordProgress(
  wordId: string,
  status: StorageWordProgress["status"],
  storedAt: string,
  completedToday: boolean,
): StorageWordProgress {
  return {
    wordId,
    status,
    lastStudiedAt: storedAt,
    completedToday,
  };
}

function countCompletedToday(wordProgress: HomeSessionSnapshot["wordProgress"]) {
  return Object.values(wordProgress).filter((progress) => progress.completedToday).length;
}

export function completeCurrentWord(
  state: HomeSessionSnapshot,
  wordId: string,
  storedAt: string,
): HomeSessionSnapshot {
  const alreadyCompletedToday = state.wordProgress[wordId]?.completedToday === true;
  const completedToday = alreadyCompletedToday
    ? state.completedToday
    : Math.min(state.completedToday + 1, state.dailyGoal);

  return {
    ...state,
    completedToday,
    currentWordIndex: getNextWordIndex(state.currentWordIndex, state.dailyGoal),
    streak: completedToday > 0 ? 1 : 0,
    wordProgress: {
      ...state.wordProgress,
      [wordId]: createWordProgress(wordId, "completed", storedAt, true),
    },
  };
}

export function skipCurrentWord(
  state: HomeSessionSnapshot,
  wordId: string,
  storedAt: string,
): HomeSessionSnapshot {
  return {
    ...state,
    currentWordIndex: getNextWordIndex(state.currentWordIndex, state.dailyGoal),
    wordProgress: {
      ...state.wordProgress,
      [wordId]: createWordProgress(wordId, "learning", storedAt, false),
    },
  };
}

export function markCurrentWordDifficult(
  state: HomeSessionSnapshot,
  wordId: string,
  storedAt: string,
): HomeSessionSnapshot {
  const wordProgress = {
    ...state.wordProgress,
    [wordId]: createWordProgress(wordId, "difficult", storedAt, false),
  };
  const completedToday = Math.min(countCompletedToday(wordProgress), state.dailyGoal);

  return {
    ...state,
    completedToday,
    currentWordIndex: getNextWordIndex(state.currentWordIndex, state.dailyGoal),
    streak: completedToday > 0 ? 1 : 0,
    wordProgress,
  };
}

export function resetHomeSession(state: HomeSessionSnapshot): HomeSessionSnapshot {
  return {
    completedToday: 0,
    currentWordIndex: 0,
    dailyGoal: state.dailyGoal,
    streak: 0,
    wordProgress: {},
  };
}
