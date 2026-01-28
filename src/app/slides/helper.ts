import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

export function goToNextSlide() {
  const router = inject(Router);
  const route = inject(ActivatedRoute);
  return (currentSlideId: number) => {
    // TODO no buisiness logic in helper files - move to Slides.page.ts or service

    if (currentSlideId === 4) {
      // navigate to some winner page
      // not implemented ...
      console.log('Navigate to winner page');
      return;
    }
    router.navigate(['../', currentSlideId + 1], { relativeTo: route });
  };
}
