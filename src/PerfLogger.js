// LICENSE : MIT
"use strict";
const MapLike = require("map-like");
const EventEmitter = require("events");
export default class PerfLogger extends EventEmitter {
    static get Events() {
        return {
            "log": "log",
            "end": "end"
        }
    }

    /**
     * @param {string[]} logItems logItems is list of event name
     */
    constructor(logItems = []) {
        super();
        this._isAlreadyOutput = false;
        this._completedEventMap = new MapLike();
        this._logItems = logItems;
    }

    /**
     * logged event names
     * @returns {string[]}
     */
    get markedNames() {
        return this._completedEventMap.keys();
    }

    get isAllMarked() {
        return this._logItems.every((eventName) => {
            return this._completedEventMap.has(eventName);
        });
    }

    /**
     * Mark log with `markerName`
     * @param {string} markerName
     */
    mark(markerName) {
        // output is only once
        if (this._isAlreadyOutput) {
            return;
        }
        this._mark(markerName);
        if (this.isAllMarked) {
            this.emit(PerfLogger.Events.end);
            this._isAlreadyOutput = true;
        }
    }

    /**
     * `window.performance.mark` を使いマークを付けます
     * @param {string} markerName
     * @private
     */
    _mark(markerName) {
        if (this._completedEventMap.has(markerName)) {
            return;
        }
        this._completedEventMap.set(markerName, true);
        window.performance.mark(markerName);
        this.emit(PerfLogger.Events.mark, markerName);
    }
};
