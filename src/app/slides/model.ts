import { InputSignal } from '@angular/core';

import {
  LetterPresentation,
  MultipleChoiceText,
  SlideLesson,
} from '../services/api.model';

import { ImageTitleSentenceComponent } from './templates/letter-presentation/image-title-sentence.component';
import { LetterPresentationComponent } from './templates/letter-presentation/letter-presentation.component';
import { MultipleChoiceTextComponent } from './templates/letter-presentation/multiple-choise-text.component';

export interface SlideTemplate<
  T = SlideLesson | LetterPresentation | MultipleChoiceText,
> {
  dataIn: InputSignal<T>;
}

export const stringTemplateMapper = {
  LETTER_PRESENTATION: LetterPresentationComponent,
  MULTIPLE_CHOICE_TEXT: MultipleChoiceTextComponent,
  IMAGE_TITLE_SENTENCE: ImageTitleSentenceComponent,
};

export type TemplateString = keyof typeof stringTemplateMapper;
