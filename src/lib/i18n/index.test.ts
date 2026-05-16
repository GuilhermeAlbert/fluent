import { describe, expect, it } from "vitest";
import { getInterfaceCopy } from "./index";

describe("getInterfaceCopy", () => {
  it("returns Portuguese system copy when interface language is portuguese", () => {
    const copy = getInterfaceCopy("portuguese");

    expect(copy.navigation.settings).toBe("Configurações");
    expect(copy.home.title).toBe("Palavra de Hoje");
    expect(copy.dailyWords.title).toBe("Palavras do Dia");
    expect(copy.settings.description).toBe("Personalize sua experiência de aprendizado.");
  });

  it("returns Spanish system copy when interface language is spanish", () => {
    const copy = getInterfaceCopy("spanish");

    expect(copy.navigation.difficultWords).toBe("Palabras Difíciles");
    expect(copy.home.nextWord).toBe("Siguiente Palabra");
    expect(copy.dailyWords.filter).toBe("Filtrar");
    expect(copy.settings.learningLanguage).toBe("Idioma de Aprendizaje");
  });
});
