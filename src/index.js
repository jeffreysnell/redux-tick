import { Ticker } from "./ticker";

/**
 * Creates a redux store enhancer which will fire actions at a configured
 * interval at your store.
 *
 * @param config {Object} the configuration for the actions see readme
 * {
 *      interval,
 *      startImmediately: {boolean} true by default
 *      actions: {
 *          type : { type, payload, interval* },
 *          type : { type, payload, interval* },
 *          type : { type, payload, interval* }
 *      }
 *  }
 * @returns {function} store enhancer
 */
export const createTickEnhancer = config => {
    const ticker = new Ticker(config);

    return createStore => (reducer, preloadedState, enhancer) => {
        const store = createStore(reducer, preloadedState, enhancer);
        ticker.bindStore(store);
        if (config.startImmediately === undefined || config.startImmediately === true) {
            ticker.start();
        }
        return store;
    };
};

export const stopAll = () => {
    Ticker.getInstances().forEach(ticker => ticker.stop());
};

export const startAll = () => {
    Ticker.getInstances().forEach(ticker => ticker.start());
};

export const getTickers = () => {
    return Ticker.getInstances();
};
