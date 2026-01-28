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

// slideshow
export interface ApiSlideshow {
  id: number;
  slides: Slide[];
}

interface Slide {
  id: number;
  order: number;
  template: string;
}

// slide lesson
export type SlideLesson =
  | ImageTitleSentence
  | LetterPresentation
  | MultipleChoiceText;

export interface ImageTitleSentence {
  id: number;
  template: string;
  text: string;
  images: Image[];
  imagesCount: number;
  audioUrl: string;
  backgroundColor: string;
  isAnimated: boolean;
  requiresAnswer: boolean;
}

export interface LetterPresentation {
  id: number;
  template: string;
  text: string;
  isAnimated: boolean;
  audioUrl: string;
  backgroundColor: string;
  requiresAnswer: boolean;
}

export interface MultipleChoiceText {
  id: number;
  template: string;
  textOptions: TextOption[];
  audioUrl: string;
  requiresAnswer: boolean;
}

interface TextOption {
  id: number;
  expectedSelection: boolean;
  text: string;
}

interface Image {
  url: string;
}
