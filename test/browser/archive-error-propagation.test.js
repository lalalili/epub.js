import { describe, expect, it } from "vite-plus/test";
import Archive from "../../src/archive";
import Store from "../../src/store";

async function settle(promise) {
    let timer;
    try {
        return await Promise.race([
            promise.then(
                (value) => ({ value }),
                (error) => ({ error }),
            ),
            new Promise((resolve) => {
                timer = setTimeout(() => resolve({ pending: true }), 100);
            }),
        ]);
    } finally {
        clearTimeout(timer);
    }
}

describe("Archive error propagation", () => {
    for (const [operation, source] of [
        ["request", "getText"],
        ["blob URL", "getBlob"],
        ["base64 URL", "getBase64"],
    ]) {
        it(`rejects the consumer promise when ${operation} extraction fails`, async () => {
            const archive = new Archive();
            const error = new Error("archive extraction failed");
            archive[source] = () => Promise.reject(error);
            const promise =
                operation === "request"
                    ? archive.request("/bad.json", "json")
                    : archive.createUrl("/bad.png", { base64: operation === "base64 URL" });
            expect(await settle(promise)).toEqual({ error });
        });
    }

    it("rejects the consumer promise when JSON parsing fails", async () => {
        const archive = new Archive();
        archive.getText = () => Promise.resolve("{invalid JSON");
        const result = await settle(archive.request("/bad.json", "json"));
        expect(result.error).toBeInstanceOf(SyntaxError);
    });
});

describe("Store URL error propagation", () => {
    for (const base64 of [false, true]) {
        it(`rejects failed ${base64 ? "base64" : "blob"} reads`, async () => {
            const store = Object.create(Store.prototype);
            store.urlCache = {};
            const error = new Error("stored asset read failed");
            store[base64 ? "getBase64" : "getBlob"] = () => Promise.reject(error);
            expect(await settle(store.createUrl("/bad.png", { base64 }))).toEqual({ error });
        });
    }
});
