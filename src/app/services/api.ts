import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';
import {
  ApiLanguages,
  ApiLevels,
  ApiSteps,
  Languages,
  Levels,
} from './api.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  // 1. Languages (Static fetch)

  languages = rxResource<Languages, unknown>({
    stream: () =>
      this.http.get<ApiLanguages>(`${this.baseUrl}/languages`).pipe(
        // Map the response to extract the languages array
        map((response) => response.languages),
      ),
  });

  levels = rxResource<Levels, unknown>({
    stream: () =>
      this.http.get<ApiLevels>(`${this.baseUrl}/levels`).pipe(
        // Map the response to extract the levels array
        map((response) => response.levels),
      ),
  });

  getSteps(levelId: number) {
    return rxResource<ApiSteps, { levelId: number }>({
      params: () => ({ levelId }),
      stream: ({ params }) =>
        this.http.get<ApiSteps>(`${this.baseUrl}/levels/${params.levelId}`),
    });
  }
  /*
  // 4. Slideshow by ID
  getSlideshow(id: () => string | undefined) {
    return rxResource<Slideshow, string>({
      request: id,
      loader: ({ request: showId }) => 
        this.http.get<Slideshow>(`${this.baseUrl}/slideshows/${showId}`)
    });
  }

  // 5. Slide by ID
  getSlide(id: () => string | undefined) {
    return rxResource<Slide, string>({
      request: id,
      loader: ({ request: slideId }) => 
        this.http.get<Slide>(`${this.baseUrl}/slides/${slideId}`)
    });
  }
  */
}
