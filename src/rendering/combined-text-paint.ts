type PaintClip = { left: number; right: number; top: number; bottom: number };
type PaintHint = { value: string; priority: string; applied: string; hadStyle: boolean };

const hints = new WeakMap<Document, Map<HTMLElement, PaintHint>>();

/** Serialize source without this module's temporary paint hints, using a detached clone. */
export function readCombinedTextPaintSource(document: Document): {
    markup: string;
    normalizedHints: number;
} {
    const body = document.body;
    if (!body) {
        return { markup: "", normalizedHints: 0 };
    }
    const active = hints.get(document);
    if (!active?.size) {
        return { markup: body.innerHTML, normalizedHints: 0 };
    }
    const clone = body.cloneNode(true) as HTMLElement;
    const originals = [body, ...body.querySelectorAll<HTMLElement>("*")];
    const copies = [clone, ...clone.querySelectorAll<HTMLElement>("*")];
    let normalizedHints = 0;
    for (const [element, hint] of active) {
        const index = originals.indexOf(element);
        if (
            index < 0 ||
            element.style.willChange !== hint.applied ||
            element.style.getPropertyPriority("will-change") !== "important"
        ) {
            continue;
        }
        restore(copies[index], hint);
        normalizedHints++;
    }
    return { markup: clone.innerHTML, normalizedHints };
}

function restore(element: HTMLElement, hint: PaintHint): void {
    if (
        element.style.willChange !== hint.applied ||
        element.style.getPropertyPriority("will-change") !== "important"
    ) {
        return;
    }
    if (hint.value) {
        element.style.setProperty("will-change", hint.value, hint.priority);
    } else {
        element.style.removeProperty("will-change");
    }
    if (!hint.hadStyle && element.getAttribute("style") === "") {
        element.removeAttribute("style");
    }
}

/** Invalidate Chromium's culled combined-text paint when a complete run enters the viewport. */
export function refreshCombinedTextPaint(document: Document, clip: PaintClip): number {
    const window = document.defaultView;
    if (!window || !document.body) {
        return 0;
    }
    const active = hints.get(document) || new Map<HTMLElement, PaintHint>();
    const visible = new Set<HTMLElement>();
    if (
        /Chrome|Chromium/.test(window.navigator.userAgent) &&
        window.getComputedStyle(document.body).writingMode === "vertical-rl"
    ) {
        for (const element of document.body.querySelectorAll<HTMLElement>("*")) {
            if (
                window.getComputedStyle(element).getPropertyValue("text-combine-upright") !== "all"
            ) {
                continue;
            }
            const rect = element.getBoundingClientRect();
            if (
                rect.width > 0 &&
                rect.height > 0 &&
                rect.left >= clip.left &&
                rect.right <= clip.right &&
                rect.top >= clip.top &&
                rect.bottom <= clip.bottom
            ) {
                visible.add(element);
            }
        }
    }
    for (const [element, hint] of active) {
        if (!visible.has(element)) {
            restore(element, hint);
            active.delete(element);
        }
    }
    let invalidated = 0;
    for (const element of visible) {
        if (active.has(element)) {
            continue;
        }
        const computed = window.getComputedStyle(element).willChange;
        if (computed.split(",").some((value) => value.trim() === "contents")) {
            continue;
        }
        const applied = computed === "auto" ? "contents" : `${computed}, contents`;
        active.set(element, {
            value: element.style.getPropertyValue("will-change"),
            priority: element.style.getPropertyPriority("will-change"),
            applied,
            hadStyle: element.hasAttribute("style"),
        });
        element.style.setProperty("will-change", applied, "important");
        invalidated++;
    }
    hints.set(document, active);
    return invalidated;
}
