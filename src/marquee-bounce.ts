import { register } from "../register";

interface input {
    count: number;
    rate: number;
}

function effect(
    this: { i: number; dir: number; prev_time: number; frac: number },
    x: input
): number[] {
    // initialization
    if (typeof this.i === "undefined") {
        // time accounting
        this.prev_time = +new Date();
        this.frac = 0;
        // start state
        this.i = 0;
        this.dir = 1;
    } else {
        //  time accounting
        const now = +new Date();
        const delta = this.frac + (x.rate * (now - this.prev_time)) / 1000;
        // next state
        this.prev_time = now;
        this.frac = delta % 1;
        // action
        if (delta > 1) {
            if (this.i >= x.count - 1) {
                this.dir = -1;
            } else if (this.i <= 0) {
                this.dir = 1;
            }
            this.i += this.dir;
        }
    }
    // return value
    const out = new Array(x.count).fill(0);
    out[this.i] = 255;
    return out;
}

register({
    /* Effect Name */
    name: "Marquee Bounce",
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
