- make sure to use node version as defined in `.nvmrc`. Run `nvm use`.
- run `npm ci` to install all dependencies.
- start the project by running `npm run web_dev`.
- make sure to run the test api `university-mobile-interview-test-server`.
- for clarity this readme will mention swiper.js as 3rd party, but its recommended by the ionic project, also some linting rules are added (`ng lint`).

Problems issues:

- i do not own any apple products so the app is currently untested on ios.
- the offline functionality task:
  - i was running out of time for this one
  - use pwa with `ng add @angular/pwa`
  - save previous api data in a localstorage (use something like @capacitor/preferences), I created service app.ts to handle such task. Maybe http interceptors can be used.
  - inform user if cached data is used

- gobal search for "todo" to see some remarks or problems mentioned

- api was not working for the slides correctly. I fixed that locally.
