# performance-logger

PerformanceTimeline based logger

## Install

Install with [npm](https://www.npmjs.com/):

    npm install performance-logger

## Usage

```js
const PerfLogger = require("performance-logger");
// These events are completed and emit "end" event
const perfLogger = new PerfLogger([
    "a",
    "b"
]);
perfLogger.on(PerfLogger.Events.end, () => {
    window.performance.measure(
        "Taken a->b",
        "a",
        "b"
    );
    const entries = window.performance.getEntriesByType('measure');
    entries.forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}ms`);
    });
});
// mark "a"
perfLogger.log("a");
// mark "b"
perfLogger.log("b");
````

## Changelog

See [Releases page](https://github.com/azu/performance-logger/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/performance-logger/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
