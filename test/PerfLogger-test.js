// LICENSE : MIT
"use strict";
require("usertiming");
const assert = require("power-assert");
import PerfLogger from "../src/PerfLogger";
describe("PerfLogger-test", function() {
    context("when complete all events", function() {
        it("should emit end event", function(done) {
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
                assert(entries.length === 1);
                entries.forEach((entry) => {
                    console.log(`${entry.name}: ${entry.duration}ms`);
                });
                done();
            });
            perfLogger.mark("a");
            perfLogger.mark("b");
        });
    });
    describe("#markedNames", function(){
        it("should should marked event names", function() {
            const perfLogger = new PerfLogger();
            perfLogger.mark("a");
            perfLogger.mark("b");
            assert.deepEqual(["a", "b"].sort(), perfLogger.markedNames.sort());
        });
    })
});