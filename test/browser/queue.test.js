import { describe, expect, it } from "vite-plus/test";
import Queue from "../../src/utils/queue";

function nextFrame() {
    return new Promise(function (resolve) {
        window.requestAnimationFrame(function () {
            window.requestAnimationFrame(resolve);
        });
    });
}

async function settleTask(promise) {
    let timeout;
    try {
        return await Promise.race([
            promise.then(
                (value) => ({ status: "fulfilled", value }),
                (reason) => ({ status: "rejected", reason }),
            ),
            new Promise((resolve) => {
                timeout = window.setTimeout(() => resolve({ status: "pending" }), 500);
            }),
        ]);
    } finally {
        window.clearTimeout(timeout);
    }
}

describe("Queue", function () {
    it("runs function tasks sequentially and resolves their values", function () {
        var queue = new Queue({ prefix: "ctx" });
        var order = [];

        var first = queue.enqueue(function (value) {
            order.push("first");
            return Promise.resolve(this.prefix + ":" + value);
        }, "a");

        var second = queue.enqueue(function (value) {
            order.push("second");
            return Promise.resolve(this.prefix + ":" + value);
        }, "b");

        return Promise.all([first, second]).then(function (values) {
            expect(values).toEqual(["ctx:a", "ctx:b"]);
            expect(order).toEqual(["first", "second"]);
            expect(queue.length()).toBe(0);
        });
    });

    it("passes promise tasks through the queue", function () {
        var queue = new Queue();
        var promise = Promise.resolve("ready");

        return queue.enqueue(promise).then(function (value) {
            expect(value).toBe("ready");
        });
    });

    it("defers paused tasks until run is called", function () {
        var queue = new Queue();
        var ran = false;

        queue.pause();

        var promise = queue.enqueue(function () {
            ran = true;
            return Promise.resolve("done");
        });

        return nextFrame()
            .then(function () {
                expect(ran).toBe(false);
                expect(queue.length()).toBe(1);
                return queue.run();
            })
            .then(function () {
                return promise;
            })
            .then(function (value) {
                expect(value).toBe("done");
                expect(ran).toBe(true);
            });
    });

    it("flushes queued tasks immediately when not already running", function () {
        var queue = new Queue();
        var order = [];

        queue.pause();
        queue.enqueue(function () {
            order.push("a");
            return Promise.resolve();
        });
        queue.enqueue(function () {
            order.push("b");
            return Promise.resolve();
        });
        queue.paused = false;

        return queue.flush().then(function () {
            expect(order).toEqual(["a", "b"]);
            expect(queue.length()).toBe(0);
        });
    });

    it("rejects when a task promise rejects", function () {
        var queue = new Queue();
        var error = new Error("failed");

        return queue
            .enqueue(function () {
                return Promise.reject(error);
            })
            .then(
                function () {
                    throw new Error("Expected queue task to reject");
                },
                function (reason) {
                    expect(reason).toBe(error);
                },
            );
    });

    it("continues after a rejected promise task while retaining the caller's rejection", async () => {
        const queue = new Queue();
        const error = new Error("promise task failed");
        queue.pause();
        const rejected = queue.enqueue(Promise.reject(error)).catch((reason) => reason);
        const next = queue.enqueue(() => "after failure");
        const drained = queue.run();
        try {
            expect(await settleTask(rejected)).toEqual({ status: "fulfilled", value: error });
            expect(await settleTask(next)).toEqual({ status: "fulfilled", value: "after failure" });
            expect(await settleTask(drained)).toEqual({ status: "fulfilled", value: undefined });
        } finally {
            queue.stop();
        }
    });

    it("rejects synchronous task errors and runs the following task", async () => {
        const queue = new Queue();
        const error = new Error("synchronous task failed");
        queue.pause();
        const rejected = queue
            .enqueue(() => {
                throw error;
            })
            .catch((reason) => reason);
        const next = queue.enqueue(() => "after failure");
        const drained = queue.run();
        try {
            expect(await settleTask(rejected)).toEqual({ status: "fulfilled", value: error });
            expect(await settleTask(next)).toEqual({ status: "fulfilled", value: "after failure" });
            expect(await settleTask(drained)).toEqual({ status: "fulfilled", value: undefined });
        } finally {
            queue.stop();
        }
    });

    it("releases the running state after a failed flush so a later task can run", async () => {
        const queue = new Queue();
        const error = new Error("flush task failed");
        queue.pause();
        const rejected = queue.enqueue(Promise.reject(error)).catch((reason) => reason);
        queue.paused = false;
        const flushed = queue.flush().catch((reason) => reason);
        try {
            expect(await settleTask(rejected)).toEqual({ status: "fulfilled", value: error });
            expect(await settleTask(flushed)).toEqual({ status: "fulfilled", value: error });
            const next = queue.enqueue(() => "after flush failure");
            expect(await settleTask(next)).toEqual({
                status: "fulfilled",
                value: "after flush failure",
            });
        } finally {
            queue.stop();
        }
    });

    it("throws when enqueue is called without a task", function () {
        var queue = new Queue();

        expect(function () {
            queue.enqueue();
        }).toThrow("No Task Provided");
    });
});
