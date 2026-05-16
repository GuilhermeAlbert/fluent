import type { InterfaceLanguage, LearningLanguage } from "../../types/settings";
import type { WordDifficulty, WordStatus } from "../../types/word";

export interface InterfaceCopy {
  common: {
    appName: string;
    difficulty: Record<WordDifficulty, string>;
    languageNames: Record<InterfaceLanguage | LearningLanguage, string>;
    wordStatus: Record<WordStatus, string>;
  };
  navigation: {
    home: string;
    dailyWords: string;
    explorer: string;
    difficultWords: string;
    progress: string;
    settings: string;
    openMenu: string;
    closeMenu: string;
    dayStreak: string;
  };
  home: {
    title: string;
    examples: string;
    notes: string;
    skip: string;
    markDifficult: string;
    nextWord: string;
    today: string;
    playPronunciation: (word: string) => string;
    progressLabel: (completed: number, planned: number) => string;
  };
  dailyWords: {
    title: string;
    description: string;
    today: string;
    filter: string;
    language: string;
    all: string;
    remaining: string;
    completed: string;
    current: string;
    noWords: string;
    markComplete: (word: string) => string;
    markIncomplete: (word: string) => string;
    openWord: (word: string) => string;
    progressLabel: (completed: number, planned: number) => string;
  };
  explorer: {
    title: string;
    description: string;
    searchPlaceholder: string;
    language: string;
    difficulty: string;
    allDifficulty: string;
    browseBy: string;
    alphabet: string;
    alphabetHint: string;
    categories: string;
    categoriesHint: string;
    tags: string;
    tagsHint: string;
    difficultyHint: string;
    frequency: string;
    frequencyHint: string;
    browseByAlphabet: string;
    all: string;
    noWords: string;
    openWord: (word: string) => string;
    viewAllWords: (count: number) => string;
    wordsCount: (count: number) => string;
    wordsStartingWith: (letter: string) => string;
  };
  difficultWords: {
    title: string;
    description: string;
    searchPlaceholder: string;
    language: string;
    filter: string;
    all: string;
    marked: string;
    hard: string;
    reviewQueue: string;
    reviewDescription: (count: number) => string;
    startReview: string;
    noWords: string;
    emptyTitle: string;
    emptyDescription: string;
    browseWords: string;
    markedCount: string;
    hardCount: string;
    totalCount: string;
    reasonMarked: string;
    reasonHard: string;
    lastStudied: string;
    notStudiedYet: string;
    markDifficult: (word: string) => string;
    removeDifficult: (word: string) => string;
    studyWord: (word: string) => string;
  };
  settings: {
    title: string;
    description: string;
    learning: string;
    dailyGoal: string;
    dailyGoalDescription: string;
    includeDifficultWords: string;
    includeDifficultWordsDescription: string;
    language: string;
    learningLanguage: string;
    learningLanguageDescription: string;
    interfaceLanguage: string;
    interfaceLanguageDescription: string;
    data: string;
    exportData: string;
    exportDataDescription: string;
    export: string;
    clearData: string;
    clearDataDescription: string;
    clear: string;
    about: string;
    version: string;
    madeForLearners: string;
    aboutFluent: string;
    aboutMessage: string;
    words: (count: number) => string;
  };
}

const copies: Record<InterfaceLanguage, InterfaceCopy> = {
  english: {
    common: {
      appName: "Fluent",
      difficulty: { easy: "Easy", medium: "Medium", hard: "Hard" },
      languageNames: { english: "English", portuguese: "Portuguese", spanish: "Spanish" },
      wordStatus: {
        new: "NEW WORD",
        learning: "LEARNING",
        completed: "COMPLETED",
        difficult: "DIFFICULT",
      },
    },
    navigation: {
      home: "Home",
      dailyWords: "Daily Words",
      explorer: "Explorer",
      difficultWords: "Difficult Words",
      progress: "Progress",
      settings: "Settings",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      dayStreak: "day streak",
    },
    home: {
      title: "Today’s Word",
      examples: "Examples",
      notes: "Notes",
      skip: "Skip",
      markDifficult: "Mark Difficult",
      nextWord: "Next Word",
      today: "today",
      playPronunciation: (word) => `Play pronunciation for ${word}`,
      progressLabel: (completed, planned) => `${completed} of ${planned} words completed today`,
    },
    dailyWords: {
      title: "Daily Words",
      description: "Learn a few words every day.",
      today: "Today",
      filter: "Filter",
      language: "Language",
      all: "All",
      remaining: "Remaining",
      completed: "Completed",
      current: "Current",
      noWords: "No words match this filter.",
      markComplete: (word) => `Mark ${word} as completed`,
      markIncomplete: (word) => `Mark ${word} as not completed`,
      openWord: (word) => `Set ${word} as current word`,
      progressLabel: (completed, planned) => `${completed} of ${planned} words`,
    },
    explorer: {
      title: "Explorer",
      description: "Browse and discover new words.",
      searchPlaceholder: "Search words, tags, or examples...",
      language: "Language",
      difficulty: "Difficulty",
      allDifficulty: "All Difficulty",
      browseBy: "Browse by",
      alphabet: "Alphabet",
      alphabetHint: "A - Z",
      categories: "Categories",
      categoriesHint: "Topics",
      tags: "Tags",
      tagsHint: "All tags",
      difficultyHint: "Easy - Hard",
      frequency: "Frequency",
      frequencyHint: "Top words",
      browseByAlphabet: "Browse by Alphabet",
      all: "All",
      noWords: "No words found.",
      openWord: (word) => `Study ${word}`,
      viewAllWords: (count) => `View all ${count} ${count === 1 ? "word" : "words"}`,
      wordsCount: (count) => `${count} ${count === 1 ? "word" : "words"}`,
      wordsStartingWith: (letter) => `Words starting with ${letter.toUpperCase()}`,
    },
    difficultWords: {
      title: "Difficult Words",
      description: "Review words that need a slower pass.",
      searchPlaceholder: "Search difficult words...",
      language: "Language",
      filter: "Filter",
      all: "All",
      marked: "Marked",
      hard: "Hard",
      reviewQueue: "Review queue",
      reviewDescription: (count) =>
        count === 1 ? "1 word is ready for review." : `${count} words are ready for review.`,
      startReview: "Start review",
      noWords: "No difficult words match this view.",
      emptyTitle: "No difficult words yet",
      emptyDescription: "Mark words as difficult while studying, or browse hard words from the library.",
      browseWords: "Browse words",
      markedCount: "Marked",
      hardCount: "Hard words",
      totalCount: "In review",
      reasonMarked: "Marked difficult",
      reasonHard: "Hard word",
      lastStudied: "Last studied",
      notStudiedYet: "Not studied yet",
      markDifficult: (word) => `Mark ${word} as difficult`,
      removeDifficult: (word) => `Remove ${word} from difficult words`,
      studyWord: (word) => `Study ${word}`,
    },
    settings: {
      title: "Settings",
      description: "Customize your learning experience.",
      learning: "Learning",
      dailyGoal: "Daily Goal",
      dailyGoalDescription: "How many words do you want to learn each day?",
      includeDifficultWords: "Include Difficult Words",
      includeDifficultWordsDescription: "Add difficult words to your daily list.",
      language: "Language",
      learningLanguage: "Learning Language",
      learningLanguageDescription: "The language you are learning.",
      interfaceLanguage: "Interface Language",
      interfaceLanguageDescription: "The language used in the app.",
      data: "Data",
      exportData: "Export Data",
      exportDataDescription: "Download your learning data as a JSON file.",
      export: "Export",
      clearData: "Clear Data",
      clearDataDescription: "This will remove all your progress locally.",
      clear: "Clear",
      about: "About",
      version: "Version",
      madeForLearners: "Made with ♥ for language learners.",
      aboutFluent: "About Fluent",
      aboutMessage: "Fluent is local-first, Markdown-ready, and stored in your browser.",
      words: (count) => `${count} words`,
    },
  },
  portuguese: {
    common: {
      appName: "Fluent",
      difficulty: { easy: "Fácil", medium: "Médio", hard: "Difícil" },
      languageNames: { english: "Inglês", portuguese: "Português", spanish: "Espanhol" },
      wordStatus: {
        new: "PALAVRA NOVA",
        learning: "APRENDENDO",
        completed: "CONCLUÍDA",
        difficult: "DIFÍCIL",
      },
    },
    navigation: {
      home: "Início",
      dailyWords: "Palavras do Dia",
      explorer: "Explorar",
      difficultWords: "Palavras Difíceis",
      progress: "Progresso",
      settings: "Configurações",
      openMenu: "Abrir menu de navegação",
      closeMenu: "Fechar menu de navegação",
      dayStreak: "dias de sequência",
    },
    home: {
      title: "Palavra de Hoje",
      examples: "Exemplos",
      notes: "Notas",
      skip: "Pular",
      markDifficult: "Marcar Difícil",
      nextWord: "Próxima Palavra",
      today: "hoje",
      playPronunciation: (word) => `Ouvir pronúncia de ${word}`,
      progressLabel: (completed, planned) => `${completed} de ${planned} palavras concluídas hoje`,
    },
    dailyWords: {
      title: "Palavras do Dia",
      description: "Aprenda algumas palavras todos os dias.",
      today: "Hoje",
      filter: "Filtrar",
      language: "Idioma",
      all: "Todas",
      remaining: "Restantes",
      completed: "Concluídas",
      current: "Atual",
      noWords: "Nenhuma palavra corresponde a este filtro.",
      markComplete: (word) => `Marcar ${word} como concluída`,
      markIncomplete: (word) => `Marcar ${word} como não concluída`,
      openWord: (word) => `Definir ${word} como palavra atual`,
      progressLabel: (completed, planned) => `${completed} de ${planned} palavras`,
    },
    explorer: {
      title: "Explorar",
      description: "Navegue e descubra novas palavras.",
      searchPlaceholder: "Buscar palavras, tags ou exemplos...",
      language: "Idioma",
      difficulty: "Dificuldade",
      allDifficulty: "Todas as Dificuldades",
      browseBy: "Navegar por",
      alphabet: "Alfabeto",
      alphabetHint: "A - Z",
      categories: "Categorias",
      categoriesHint: "Tópicos",
      tags: "Tags",
      tagsHint: "Todas as tags",
      difficultyHint: "Fácil - Difícil",
      frequency: "Frequência",
      frequencyHint: "Palavras principais",
      browseByAlphabet: "Navegar por Alfabeto",
      all: "Todas",
      noWords: "Nenhuma palavra encontrada.",
      openWord: (word) => `Estudar ${word}`,
      viewAllWords: (count) => `Ver ${count === 1 ? "a" : "todas as"} ${count} ${count === 1 ? "palavra" : "palavras"}`,
      wordsCount: (count) => `${count} ${count === 1 ? "palavra" : "palavras"}`,
      wordsStartingWith: (letter) => `Palavras começando com ${letter.toUpperCase()}`,
    },
    difficultWords: {
      title: "Palavras Difíceis",
      description: "Revise palavras que precisam de uma passada mais calma.",
      searchPlaceholder: "Buscar palavras difíceis...",
      language: "Idioma",
      filter: "Filtro",
      all: "Todas",
      marked: "Marcadas",
      hard: "Difíceis",
      reviewQueue: "Fila de revisão",
      reviewDescription: (count) =>
        count === 1 ? "1 palavra está pronta para revisão." : `${count} palavras estão prontas para revisão.`,
      startReview: "Começar revisão",
      noWords: "Nenhuma palavra difícil corresponde a esta visão.",
      emptyTitle: "Nenhuma palavra difícil ainda",
      emptyDescription: "Marque palavras como difíceis durante o estudo ou navegue pelas palavras avançadas da biblioteca.",
      browseWords: "Explorar palavras",
      markedCount: "Marcadas",
      hardCount: "Palavras difíceis",
      totalCount: "Em revisão",
      reasonMarked: "Marcada como difícil",
      reasonHard: "Palavra difícil",
      lastStudied: "Último estudo",
      notStudiedYet: "Ainda não estudada",
      markDifficult: (word) => `Marcar ${word} como difícil`,
      removeDifficult: (word) => `Remover ${word} das palavras difíceis`,
      studyWord: (word) => `Estudar ${word}`,
    },
    settings: {
      title: "Configurações",
      description: "Personalize sua experiência de aprendizado.",
      learning: "Aprendizado",
      dailyGoal: "Meta Diária",
      dailyGoalDescription: "Quantas palavras você quer aprender por dia?",
      includeDifficultWords: "Incluir Palavras Difíceis",
      includeDifficultWordsDescription: "Adicione palavras difíceis à sua lista diária.",
      language: "Idioma",
      learningLanguage: "Idioma de Aprendizado",
      learningLanguageDescription: "O idioma que você está aprendendo.",
      interfaceLanguage: "Idioma da Interface",
      interfaceLanguageDescription: "O idioma usado no aplicativo.",
      data: "Dados",
      exportData: "Exportar Dados",
      exportDataDescription: "Baixe seus dados de aprendizado como JSON.",
      export: "Exportar",
      clearData: "Limpar Dados",
      clearDataDescription: "Isso removerá todo o seu progresso local.",
      clear: "Limpar",
      about: "Sobre",
      version: "Versão",
      madeForLearners: "Feito com ♥ para estudantes de idiomas.",
      aboutFluent: "Sobre o Fluent",
      aboutMessage: "Fluent é local-first, pronto para Markdown e salvo no seu navegador.",
      words: (count) => `${count} palavras`,
    },
  },
  spanish: {
    common: {
      appName: "Fluent",
      difficulty: { easy: "Fácil", medium: "Medio", hard: "Difícil" },
      languageNames: { english: "Inglés", portuguese: "Portugués", spanish: "Español" },
      wordStatus: {
        new: "PALABRA NUEVA",
        learning: "APRENDIENDO",
        completed: "COMPLETADA",
        difficult: "DIFÍCIL",
      },
    },
    navigation: {
      home: "Inicio",
      dailyWords: "Palabras Diarias",
      explorer: "Explorar",
      difficultWords: "Palabras Difíciles",
      progress: "Progreso",
      settings: "Configuración",
      openMenu: "Abrir menú de navegación",
      closeMenu: "Cerrar menú de navegación",
      dayStreak: "días de racha",
    },
    home: {
      title: "Palabra de Hoy",
      examples: "Ejemplos",
      notes: "Notas",
      skip: "Saltar",
      markDifficult: "Marcar Difícil",
      nextWord: "Siguiente Palabra",
      today: "hoy",
      playPronunciation: (word) => `Reproducir pronunciación de ${word}`,
      progressLabel: (completed, planned) => `${completed} de ${planned} palabras completadas hoy`,
    },
    dailyWords: {
      title: "Palabras Diarias",
      description: "Aprende algunas palabras cada día.",
      today: "Hoy",
      filter: "Filtrar",
      language: "Idioma",
      all: "Todas",
      remaining: "Restantes",
      completed: "Completadas",
      current: "Actual",
      noWords: "Ninguna palabra coincide con este filtro.",
      markComplete: (word) => `Marcar ${word} como completada`,
      markIncomplete: (word) => `Marcar ${word} como no completada`,
      openWord: (word) => `Definir ${word} como palabra actual`,
      progressLabel: (completed, planned) => `${completed} de ${planned} palabras`,
    },
    explorer: {
      title: "Explorar",
      description: "Navega y descubre nuevas palabras.",
      searchPlaceholder: "Buscar palabras, tags o ejemplos...",
      language: "Idioma",
      difficulty: "Dificultad",
      allDifficulty: "Toda Dificultad",
      browseBy: "Navegar por",
      alphabet: "Alfabeto",
      alphabetHint: "A - Z",
      categories: "Categorías",
      categoriesHint: "Temas",
      tags: "Tags",
      tagsHint: "Todas las tags",
      difficultyHint: "Fácil - Difícil",
      frequency: "Frecuencia",
      frequencyHint: "Palabras principales",
      browseByAlphabet: "Navegar por Alfabeto",
      all: "Todas",
      noWords: "No se encontraron palabras.",
      openWord: (word) => `Estudiar ${word}`,
      viewAllWords: (count) => `Ver ${count === 1 ? "la" : "las"} ${count} ${count === 1 ? "palabra" : "palabras"}`,
      wordsCount: (count) => `${count} ${count === 1 ? "palabra" : "palabras"}`,
      wordsStartingWith: (letter) => `Palabras que empiezan con ${letter.toUpperCase()}`,
    },
    difficultWords: {
      title: "Palabras Difíciles",
      description: "Repasa palabras que necesitan un ritmo más lento.",
      searchPlaceholder: "Buscar palabras difíciles...",
      language: "Idioma",
      filter: "Filtro",
      all: "Todas",
      marked: "Marcadas",
      hard: "Difíciles",
      reviewQueue: "Cola de repaso",
      reviewDescription: (count) =>
        count === 1 ? "1 palabra está lista para repasar." : `${count} palabras están listas para repasar.`,
      startReview: "Empezar repaso",
      noWords: "Ninguna palabra difícil coincide con esta vista.",
      emptyTitle: "Aún no hay palabras difíciles",
      emptyDescription: "Marca palabras como difíciles mientras estudias, o explora las palabras avanzadas de la biblioteca.",
      browseWords: "Explorar palabras",
      markedCount: "Marcadas",
      hardCount: "Palabras difíciles",
      totalCount: "En repaso",
      reasonMarked: "Marcada como difícil",
      reasonHard: "Palabra difícil",
      lastStudied: "Último estudio",
      notStudiedYet: "Aún no estudiada",
      markDifficult: (word) => `Marcar ${word} como difícil`,
      removeDifficult: (word) => `Quitar ${word} de palabras difíciles`,
      studyWord: (word) => `Estudiar ${word}`,
    },
    settings: {
      title: "Configuración",
      description: "Personaliza tu experiencia de aprendizaje.",
      learning: "Aprendizaje",
      dailyGoal: "Meta Diaria",
      dailyGoalDescription: "¿Cuántas palabras quieres aprender cada día?",
      includeDifficultWords: "Incluir Palabras Difíciles",
      includeDifficultWordsDescription: "Agrega palabras difíciles a tu lista diaria.",
      language: "Idioma",
      learningLanguage: "Idioma de Aprendizaje",
      learningLanguageDescription: "El idioma que estás aprendiendo.",
      interfaceLanguage: "Idioma de la Interfaz",
      interfaceLanguageDescription: "El idioma usado en la aplicación.",
      data: "Datos",
      exportData: "Exportar Datos",
      exportDataDescription: "Descarga tus datos de aprendizaje como JSON.",
      export: "Exportar",
      clearData: "Borrar Datos",
      clearDataDescription: "Esto eliminará todo tu progreso local.",
      clear: "Borrar",
      about: "Acerca de",
      version: "Versión",
      madeForLearners: "Hecho con ♥ para estudiantes de idiomas.",
      aboutFluent: "Acerca de Fluent",
      aboutMessage: "Fluent es local-first, listo para Markdown y guardado en tu navegador.",
      words: (count) => `${count} palabras`,
    },
  },
};

export function getInterfaceCopy(language: InterfaceLanguage): InterfaceCopy {
  return copies[language] ?? copies.english;
}
