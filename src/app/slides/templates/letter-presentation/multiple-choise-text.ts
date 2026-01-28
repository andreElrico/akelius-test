import { Component, input, OnInit } from '@angular/core';
import { SlideTemplate } from '../../model';
import { MultipleChoiceText } from 'src/app/services/api.model';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-multiple-choice-text',
  standalone: true,
  template: `app-multiple-choice-text
    <pre>{{ dataIn() | json }}</pre>`,
  styles: ``,
  imports: [JsonPipe],
})
export class MultipleChoiceTextComponent implements SlideTemplate<MultipleChoiceText> {
  dataIn = input({} as MultipleChoiceText);
}
