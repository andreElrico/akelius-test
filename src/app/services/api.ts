import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { environment } from 'src/environments/environment';
import { ApiLanguages, Languages } from './api.model';
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
  /*
  // 2. Levels (Static fetch)
  levels = rxResource<Level[], unknown>({
    loader: () => this.http.get<Level[]>(`${this.baseUrl}/levels`)
  });

  // --- Dynamic Resources (Paramterized) ---

  // 3. Level by ID
  // usage: levelId = signal('123'); api.getLevel(levelId);
  getLevel(id: () => string | undefined) {
    return rxResource<Level, string>({
      request: id,
      loader: ({ request: levelId }) => 
        this.http.get<Level>(`${this.baseUrl}/levels/${levelId}`)
    });
  }

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
