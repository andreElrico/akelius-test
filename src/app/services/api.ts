import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

import {
  ApiLanguages,
  ApiLevels,
  ApiSlideshow,
  ApiSteps,
  Languages,
  Levels,
  SlideLesson,
} from './api.model';

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

  getSlideshows(stepId: number) {
    return rxResource<ApiSlideshow, { stepId: number }>({
      params: () => ({ stepId }),
      stream: ({ params }) =>
        this.http.get<ApiSlideshow>(
          `${this.baseUrl}/slideshows/${params.stepId}`,
        ),
    });
  }

  getSlide(slideId: number) {
    return rxResource<SlideLesson, { slideId: number }>({
      params: () => ({ slideId }),
      stream: ({ params }) =>
        this.http.get<SlideLesson>(`${this.baseUrl}/slides/${params.slideId}`),
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
