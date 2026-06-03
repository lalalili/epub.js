import { describe, expect, it, vi } from "vitest";
import Hook from "../../src/utils/hook";

describe("Hook", function() {
	it("registers individual and array tasks and resolves async results", function() {
		var context = { prefix: "ctx" };
		var hook = new Hook(context);
		var order = [];

		function first(value) {
			order.push(this.prefix + ":first:" + value);
		}

		function second(value) {
			order.push(this.prefix + ":second:" + value);
			return Promise.resolve("second");
		}

		hook.register(first, [second]);

		return hook.trigger("value").then(function(results) {
			expect(results).toEqual(["second"]);
			expect(order).toEqual(["ctx:first:value", "ctx:second:value"]);
			expect(hook.list()).toEqual([first, second]);
		});
	});

	it("deregisters tasks and clears the list", function() {
		var hook = new Hook();
		var first = function() {};
		var second = function() {};

		hook.register(first, second);
		hook.deregister(first);

		expect(hook.list()).toEqual([second]);
		expect(hook.clear()).toEqual([]);
		expect(hook.list()).toEqual([]);
	});

	it("logs synchronous task errors without rejecting later async tasks", function() {
		var hook = new Hook();
		var error = new Error("hook failed");
		var log = vi.spyOn(console, "log").mockImplementation(function() {});

		hook.register(function() {
			throw error;
		}, function() {
			return Promise.resolve("after");
		});

		return hook.trigger().then(function(results) {
			expect(results).toEqual(["after"]);
			expect(log).toHaveBeenCalledWith(error);
			log.mockRestore();
		});
	});
});
