// languages
interface Language {
  code: string;
  name: string;
}
export interface ApiLanguages {
  languages: Language[];
}
export type Languages = Language[];

// levels
interface Level {
  id: number;
  languageCode: string;
  title: string;
}
export interface ApiLevels {
  levels: Level[];
}
export type Levels = Level[];

// steps
export interface ApiSteps {
  id: number;
  title: string;
  steps: Step[];
}
interface Step {
  id: number;
  title: string;
  slideshowId: number;
}
