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
