import { gcd } from "./maths";

const DEFAULT_INTERVAL = 1000; // Provide 1 second default

const _instances = [];

export class Ticker {
    static getInstances() {
        return _instances;
    }

    /**
     * @param config {Object} the configuration for the actions see readme
     * {
     *      interval
     *      actions: {
     *          type : { type, payload, interval* },
     *          type : { type, payload, interval* },
     *          type : { type, payload, interval* }
     *      }
     *  }
     * */
    constructor(config = {}) {
        this.initialized = true;
        this.config = config;
        this.defaultInterval = parseInt(config && config.interval) || DEFAULT_INTERVAL;
        const intervals = [
            this.defaultInterval,
            ...Object.values(config.actions || {}).map(action => parseInt(action.interval))
        ];
        this.tickInterval = gcd(intervals);
        if (this.tickInterval === 1 && config.interval !== 1) {
            console.warn(
                "You have configured your actions such that an even will be fired every 1 ms, if that is what you desire please set the top level config interval to 1 as well as this has serious performanced implications"
            );
            this.initialized = false;
        }
        this.maxTick = Math.max(...intervals);
        this.elapsed = 0;
    }

    bindStore(store) {
        this.store = store;
    }

    handleTick() {
        const config = this.config;
        this.elapsed = (this.elapsed + this.tickInterval) % this.maxTick;
        if (config && config.actions) {
            const actions = config.actions;
            Object.keys(actions).forEach(key => {
                let action = actions[key];
                const interval = parseInt(action.interval) || this.defaultInterval;
                if (this.elapsed % interval === 0) {
                    this.store.dispatch(action);
                }
            });
        }
    }

    start() {
        if (this.initialized && !this.interval) {
            this.interval = setInterval(this.handleTick.bind(this), this.tickInterval);
            this.elapsed = 0;
        }
    }

    stop() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
