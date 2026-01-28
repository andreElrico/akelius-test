import { Component, input } from '@angular/core';
import { LetterPresentation } from 'src/app/services/api.model';
import { SlideTemplate } from '../../model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-letter-presentation',
  standalone: true,
  template: `app-letter-presentation
    <pre>{{ dataIn() | json }}</pre>`,
  styles: ``,
  imports: [JsonPipe],
})
export class LetterPresentationComponent implements SlideTemplate<LetterPresentation> {
  dataIn = input({} as LetterPresentation);
}
