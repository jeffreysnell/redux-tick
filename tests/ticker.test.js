/* eslint-env mocha */
import { expect } from "chai";
import td from "testdouble";
import { Ticker } from "../src/ticker";

describe("ticker", () => {
    beforeEach(() => {});
    afterEach(() => td.reset());
    context("config", () => {
        it("supplies a default tick rate", () => {
            const ticker = new Ticker({});
            expect(ticker.tickInterval).to.equal(1000);
        });
        it("correctly calculates the tick rate based on interval", () => {
            let ticker = new Ticker({ interval: 100 });
            expect(ticker.tickInterval).to.equal(100);
            ticker = new Ticker({ interval: "100" });
            expect(ticker.tickInterval).to.equal(100);
        });
        it("correctly calculates the tick rate based on action intervals", () => {
            const ticker = new Ticker({
                interval: 100,
                actions: {
                    foo: { interval: 50 },
                    bar: { interval: 90 }
                }
            });
            expect(ticker.tickInterval).to.equal(10);
        });
    });
    context("start", () => {
        beforeEach(() => {
            td.replace(global, "setInterval");
        });

        it("should start an interval firing actions against the store", () => {
            const ticker = new Ticker({
                interval: 100,
                actions: {
                    foo: { interval: 50 },
                    bar: { interval: 90 }
                }
            });
            ticker.start();
            td.verify(global.setInterval(td.matchers.anything(), 10));
        });
    });

    context("handleTick", () => {
        let store;
        beforeEach(() => {
            store = td.object(["dispatch"]);
        });
        it("should fire actions against the store", () => {
            const actions = {
                fast: { type: "fast", interval: 20 },
                foo: { type: "foo", interval: 50 },
                bar: { type: "bar", interval: 90 }
            };
            const ticker = new Ticker({
                interval: 100,
                actions
            });
            ticker.bindStore(store);

            ticker.handleTick();
            td.verify(store.dispatch(), { ignoreExtraArgs: true, times: 0 });

            ticker.handleTick(); //20
            td.verify(store.dispatch(actions.fast));
            ticker.handleTick(); //30
            ticker.handleTick(); //40
            td.verify(store.dispatch(actions.foo), { times: 0 });
            ticker.handleTick(); //50
            td.verify(store.dispatch(actions.foo), { times: 1 });

            td.verify(store.dispatch(actions.fast), { times: 2 });
        });
        it("should still fire actions properly with only one action", () => {
            const actions = {
                fast: { type: "fast", interval: 20 }
            };
            const ticker = new Ticker({
                interval: 100,
                actions
            });
            ticker.bindStore(store);

            ticker.handleTick(); //20
            td.verify(store.dispatch(actions.fast));

            ticker.handleTick(); //20
            td.verify(store.dispatch(actions.fast), { times: 2 });
        });

        it("should wrap around the counters so we don't have to deal with large numbers", () => {
            const actions = {
                fast: { type: "fast", interval: 20 },
                slow: { type: "slow", interval: 40 }
            };
            const ticker = new Ticker({
                interval: 40,
                actions
            });
            ticker.bindStore(store);

            ticker.handleTick();
            expect(ticker.elapsed).to.be.most(40);
            ticker.handleTick();
            expect(ticker.elapsed).to.be.most(40);
            ticker.handleTick();
            expect(ticker.elapsed).to.be.most(40);
            ticker.handleTick();
            expect(ticker.elapsed).to.be.most(40);
            ticker.handleTick();
            expect(ticker.elapsed).to.be.most(40);
            ticker.handleTick();
            expect(ticker.elapsed).to.be.most(40);
            ticker.handleTick();
            expect(ticker.elapsed).to.be.most(40);
        });
    });
});
