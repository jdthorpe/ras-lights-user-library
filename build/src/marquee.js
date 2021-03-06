"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const register_1 = require("../register");
function effect(x) {
    // initialization
    if (typeof this.i === "undefined") {
        // start state
        this.i = 0;
        // time accounting
        this.prev_time = +new Date();
        this.frac = 0;
    }
    else {
        //  time accounting
        const now = +new Date();
        const delta = this.frac + (x.rate * (now - this.prev_time)) / 1000;
        this.i = (this.i + Math.floor(delta)) % x.count;
        this.prev_time = now;
        this.frac = delta % 1;
    }
    const out = new Array(x.count).fill(0);
    out[this.i] = 255;
    return out;
}
(0, register_1.register)({
    /* Effect Name */
    name: "Marquee",
    /* Effect Function */
    func: effect,
    /* Effect Inputs */
    input: [
        {
            key: "count",
            type: "integer",
            label: "Width",
            default: 5,
            min: 1,
            max: 100,
        },
        {
            key: "rate",
            type: "number",
            label: "Rate",
            default: 3,
            min: 1,
            max: 100,
        },
    ],
    /* Effect Output Type */
    output: "number[]",
});
