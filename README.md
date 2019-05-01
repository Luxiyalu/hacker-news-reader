## Available Scripts

In the project directory, the following scripts are available:

### `yarn`

Install all the required dependencies.

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

### `yarn test`

Launches the test runner (Jest) in the interactive watch mode, which includes Component Level and Unit Tests.

### `yarn cypress`

Launches End-to-End tests written in Cypress.

## Technical Considerations

### Dependencies

Among all the dependencies listed in `package.json`, 4 of them are the major ones that will actually be in `bundle.js` after build:

    "firebase": "^5.10.1",
    "re-base": "^4.0.0",
    "react": "^16.8.6",
    "react-dom": "^16.8.6"

I chose to use `re-base`, a Firebase React web client, because the API endpoints are hosted on Firebase. It is good to have the option of accessing real-time data, as I have implemented.

If you `yarn start` the project and wait long enough, you will see the list is updated real time; the newly updated items will be highlighted for 3 seconds before the highlight fades.

Due to the light-weight requirement, other utility functions like `debounce` and `timeAgo` are included as code snippets under `src/services`.

### Modular Design

The structure of the app is roughly as follows:

```
|- config/
|- cypress/
|- public/
|- src/
  |- components/
    |- App/
      |- App.js
      |- App.scss
      |- App.test.js
    |- Header/
    |- Story/
  |--- services/
```

`<Header />` as well as each `<Story />` item is split out into their own components, so that each of their function is well divided and easy to test.

### Offline Capability

Since the site needs to work offline, I chose two types of caches: `serviceWorker` and `localStorage`.

`serviceWorker` is to provide file caches, so that after the first load, the site can be viewed offline. And `localStorage` is to provide server response cache, both during a single page load and during further page refreshes, so that the same request is not repeatedly sent.

As a result of the above two combined, the second load will seem to take no time at all, since everything is cached from the previous run. And if there are diffs from the last load, they will come in the form of `WebSocket` message updates, which will be handled by `re-base`'s `bindToState`.

### Display Each Item ASAP

To achieve the effect of sequential load, `map` is used in `render()` of react, so that they execute one after another, and will show up as soon as it finishes loading. If you tune the `Network` down to `Slow 3G` or lower, you will see them showing up in sequence.

To make sure that the page does not choke on too much loading and rendering on the initial load, I limited the initial load to be 20 items. It will continue to load if a) page is scrolled to the bottom, or b) page is longer than 20 items' height.

### Infinite Scroll

To provide a smooth experience with infinite scroll, preload of the next 30 items is triggered whenever the page reaches the bottom.

Also, to make sure that `handleScroll` does not become a bottleneck for performance, the function is slightly debounced. The time chosen is not too long either, since otherwise further loading will not respond and display as smoothly.

### Accessibility

To take accessibility into consideration, images (logo) included `alt` attribute, and semantic HTML was preferred over common `div`s.

### Mobile

I took roughly the same path with the original HackerNews website, as in using responsive design. And since the layout of the website is not complicated, it suffices for mobiles as well as wide screens.

Also, `manifest.json` is included under `/public` so that behaviours are specified when the app is "installed" on a mobile device.

### Readability

First, complicated parts of a function are split out into their own methods, and in some cases, into separate utility files.

Second, git commits are well divided by their functionality, and messages are added depending on each.

### Testability

Since 12 hours is running out, I only had time to set them up and didn't finish filling them out:

##### 1. Component Tests with `Jest` and `react-test-renderer`:

- As much as possible, component methods are written in the form of pure functions.
- Utility functions are split out into `src/services` for testability.
- Snapshots are taken.

##### 2. Unit Tests with `Jest`:

- Since utility functions are pure functions, they're relatively easy to test.

##### 3. End-to-End Tests with `Cypress`:

- A go-through of the complete user actions.

### Other Considerations

If I had more time, other than filling out test coverages and setting up tests for different environments, I would also want to:

1. Properly set up webpack config, including splitting the build file `bundle.js` into chunks, so that I can take advantage of each domain's simultaneous multiple requests.
2. On the UX side, whenever the page loads new content in the background, pop up a `Scroll up to latest` button at the top of the screen, which upon click will scroll the page back top.
3. Since page latency is vital with this site, depending on how much time I have and how important it is, I would like to have server-side render set up for React, so that no client DOM rendering is necessary.
4. Add analytics, because feedback is valuable and necessary in all user interactions, otherwise everything will be a walk in the dark.
5. There can probably be better designs and animations, but I'm not an expert... :/ Need to talk to someone who is.
