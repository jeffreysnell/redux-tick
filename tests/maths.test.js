/* eslint-env mocha */
import { expect } from "chai";
import { gcd } from "../src/maths";

describe("maths", () => {
    context("gcd", () => {
        it("returns 1 when there is a 0 input", () => {
            expect(gcd([1, 0, 1, 2, 3, 4, 5])).to.equal(1);
        });

        it("returns 1 when there is a 1 input", () => {
            expect(gcd([10, 1, 2, 3, 4, 5])).to.equal(1);
        });

        it("should return the common factyor from the list", () => {
            expect(gcd([2, 4, 6, 8, 10])).to.equal(2);
            expect(gcd([25, 50, 100, 300, 700])).to.equal(25);
            expect(gcd([100, 200, 100, 300, 700])).to.equal(100);
        });
        it("should return a shared factor not in the list", () => {
            expect(gcd([15, 35, 95, 75])).to.equal(5);
            expect(gcd([64, 48, 144])).to.equal(16);
        });
        it("should return 1 when there is no gcd", () => {
            expect(gcd([3, 7, 5, 19])).to.equal(1);
            expect(gcd([2, 4, 8, 7, 5, 19])).to.equal(1);
        });
    });
});
