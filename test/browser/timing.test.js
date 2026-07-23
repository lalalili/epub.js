import { describe, expect, it, vi } from "vitest";
import { debounce, throttle } from "../../src/utils/timing";

describe("timing helpers", () => {
	it("debounces repeated calls with the latest arguments", () => {
		vi.useFakeTimers();
		const callback = vi.fn((value) => `done:${value}`);
		const debounced = debounce(callback, 30);

		debounced("first");
		debounced("last");
		vi.advanceTimersByTime(29);
		expect(callback).not.toHaveBeenCalled();
		vi.advanceTimersByTime(1);

		expect(callback).toHaveBeenCalledOnce();
		expect(callback).toHaveBeenCalledWith("last");
		vi.useRealTimers();
	});

	it("supports cancel and flush controls", () => {
		vi.useFakeTimers();
		const callback = vi.fn((value) => value);
		const debounced = debounce(callback, 30);

		debounced("cancelled");
		debounced.cancel();
		vi.advanceTimersByTime(30);
		expect(callback).not.toHaveBeenCalled();

		debounced("flushed");
		expect(debounced.flush()).toBe("flushed");
		expect(callback).toHaveBeenCalledOnce();
		vi.useRealTimers();
	});

	it("throttles with leading and trailing calls", () => {
		vi.useFakeTimers();
		const callback = vi.fn((value) => value);
		const throttled = throttle(callback, 50);

		expect(throttled("leading")).toBe("leading");
		throttled("middle");
		throttled("trailing");
		expect(callback).toHaveBeenCalledOnce();
		vi.advanceTimersByTime(50);

		expect(callback).toHaveBeenCalledTimes(2);
		expect(callback).toHaveBeenLastCalledWith("trailing");
		vi.useRealTimers();
	});
});
