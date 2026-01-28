import { Component, input } from '@angular/core';
import { SlideTemplate } from '../../model';
import { ImageTitleSentence } from 'src/app/services/api.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-image-title-sentence',
  standalone: true,
  template: `app-image-title-sentence
    <pre>{{ dataIn() | json }}</pre>`,
  styles: ``,
  imports: [JsonPipe],
})
export class ImageTitleSentenceComponent implements SlideTemplate<ImageTitleSentence> {
  dataIn = input({} as ImageTitleSentence);
}
