import { collectVisibleTextClientRects } from "../platform/traversal";

type MediaContents = {
    document: Document;
    window: Window;
    content: HTMLElement;
};

type OriginalStyle = { value: string; priority: string };
const originalStyles = new WeakMap<Element, Record<string, OriginalStyle>>();
const fittedMediaDocuments = new WeakSet<Document>();

export function getVerticalRlMediaLeftGutter(
    pageWidth: number,
    pageAdvance: number,
    dpr: number,
): number {
    const pixels = Math.max(0, pageWidth - pageAdvance) * dpr;
    const nearest = Math.round(pixels);
    // Fractional WebView dimensions can represent an integer device pixel slightly above it.
    return (Math.abs(pixels - nearest) <= 1e-4 ? nearest : Math.ceil(pixels)) / dpr;
}

/** The last source block is a fitted image-only normal-flow canvas. */
export function hasFittedVerticalRlMediaTail(document: Document): boolean {
    return fittedMediaDocuments.has(document);
}

function restoreOriginalStyles(element: HTMLElement, properties: string[]): void {
    let original = originalStyles.get(element);
    if (!original) {
        original = Object.fromEntries(
            properties.map((key) => [
                key,
                {
                    value: element.style.getPropertyValue(key),
                    priority: element.style.getPropertyPriority(key),
                },
            ]),
        );
        originalStyles.set(element, original);
    }
    for (const [key, style] of Object.entries(original)) {
        if (style.value) {
            element.style.setProperty(key, style.value, style.priority);
        } else {
            element.style.removeProperty(key);
        }
    }
}

function fitMaxWidth(element: HTMLElement, window: Window, pageWidth: number): void {
    const authorLimit = window.getComputedStyle(element).maxWidth;
    element.style.setProperty(
        "max-width",
        authorLimit === "none" ? `${pageWidth}px` : `min(${pageWidth}px, ${authorLimit})`,
        "important",
    );
}

function isAuthoredCenteredImage(image: HTMLImageElement, window: Window): boolean {
    const typedStyle = image.computedStyleMap?.();
    return typedStyle
        ? typedStyle.get("margin-left")?.toString() === "auto" &&
              typedStyle.get("margin-right")?.toString() === "auto"
        : Boolean(
              image.parentElement &&
              window.getComputedStyle(image.parentElement).textAlign === "center",
          );
}

/** Include only fitted normal-flow images as indivisible boundary intervals. */
export function collectVerticalRlBlockMediaRects(
    document: Document,
    window: Window,
    pageWidth: number,
): Array<DOMRect & { centered?: boolean }> {
    if (!document.querySelectorAll || !window.getComputedStyle) {
        return [];
    }
    return Array.from(document.querySelectorAll<HTMLImageElement>("img")).flatMap((image) => {
        const style = window.getComputedStyle(image);
        if (
            style.display !== "block" ||
            style.position !== "static" ||
            style.visibility !== "visible" ||
            style.transform !== "none"
        ) {
            return [];
        }
        const rect = image.getBoundingClientRect();
        const centered = isAuthoredCenteredImage(image, window);
        return rect.width > 0 && rect.height > 0 && rect.width <= pageWidth
            ? [Object.assign(rect, { centered })]
            : [];
    });
}

/** A fitted image may own an otherwise text-free viewport, including a learned offset. */
export function resolveVerticalRlBlockMediaOffset(
    offset: number,
    maxScroll: number,
    contentWidth: number,
    pageWidth: number,
    mediaRects: Array<{ left: number; right: number; width: number; centered?: boolean }>,
    textRects: Array<{ left: number; right: number }>,
    edgeGuard = 0,
    leftGutter = 0,
): number {
    const rawLeft = contentWidth - offset - pageWidth;
    const rawRight = contentWidth - offset;
    if (textRects.some((rect) => rect.right > rawLeft && rect.left < rawRight)) {
        return offset;
    }
    const leftInset = Math.max(edgeGuard, leftGutter);
    const left = rawLeft + leftInset;
    const right = rawRight - edgeGuard;
    for (const media of mediaRects) {
        if (
            media.centered &&
            media.width > 0 &&
            media.width <= pageWidth - leftInset - edgeGuard &&
            media.right > left &&
            media.left < right
        ) {
            const centeredOffset = Math.max(
                contentWidth - pageWidth + leftInset - media.left,
                Math.min(
                    contentWidth - edgeGuard - media.right,
                    contentWidth - (media.left + media.right + pageWidth) / 2,
                ),
            );
            const centeredLeft = contentWidth - centeredOffset - pageWidth;
            const centeredRight = contentWidth - centeredOffset;
            if (
                centeredOffset >= 0 &&
                centeredOffset <= maxScroll &&
                media.left >= centeredLeft + leftInset &&
                media.right <= centeredRight - edgeGuard &&
                !textRects.some((rect) => rect.right > centeredLeft && rect.left < centeredRight) &&
                !mediaRects.some(
                    (other) =>
                        other !== media && other.right > centeredLeft && other.left < centeredRight,
                )
            ) {
                return centeredOffset;
            }
        }
        if (
            !(media.width > 0 && media.width <= pageWidth - leftInset - edgeGuard) ||
            media.right <= left ||
            media.left >= right ||
            (media.left >= left && media.right <= right)
        ) {
            continue;
        }
        const target =
            media.left < left
                ? contentWidth - pageWidth + leftInset - media.left
                : contentWidth - edgeGuard - media.right;
        if (target < 0 || target > maxScroll) {
            continue;
        }
        const nextLeft = contentWidth - target - pageWidth + leftInset;
        const nextRight = contentWidth - target - edgeGuard;
        if (
            textRects.some(
                (rect) =>
                    (rect.left < nextLeft && rect.right > nextLeft) ||
                    (rect.left < nextRight && rect.right > nextRight),
            )
        ) {
            continue;
        }
        return target;
    }
    return offset;
}

/** Keep normal-flow block images in one vertical page without changing DOM identity. */
export function layoutVerticalRlBlockMedia(
    contents: MediaContents,
    pageWidth: number,
    edgeGuard = 0,
    pageViewportWidth = 0,
): void {
    fittedMediaDocuments.delete(contents.document);
    const images = contents.content?.querySelectorAll<HTMLImageElement>("img");
    if (
        !(pageWidth > 0) ||
        !images?.length ||
        !contents.window?.getComputedStyle ||
        contents.window.getComputedStyle(contents.content).writingMode !== "vertical-rl"
    ) {
        return;
    }
    const usableWidth = pageWidth - 2 * edgeGuard;
    if (!(usableWidth > 0)) {
        return;
    }
    const dpr = contents.window.devicePixelRatio || 1;
    const imageWidth = Number.isInteger(pageWidth * dpr)
        ? usableWidth
        : Math.min(usableWidth, pageWidth - 2 / dpr);
    const origin = contents.window.innerWidth;
    for (const image of images) {
        const computed = contents.window.getComputedStyle(image);
        if (
            computed.display !== "block" ||
            computed.position !== "static" ||
            computed.transform !== "none" ||
            image.closest("svg")
        ) {
            continue;
        }
        const wrapper = image.parentElement;
        let alignedElement: HTMLElement = image;
        if (
            wrapper &&
            wrapper !== contents.content &&
            wrapper.childElementCount === 1 &&
            !wrapper.textContent?.trim()
        ) {
            const wrapperStyle = contents.window.getComputedStyle(wrapper);
            if (wrapperStyle.position === "static" && wrapperStyle.transform === "none") {
                restoreOriginalStyles(wrapper, ["max-width", "margin-right"]);
                fitMaxWidth(wrapper, contents.window, usableWidth);
                alignedElement = wrapper;
            }
        }
        restoreOriginalStyles(image, ["max-width", "margin-right"]);
        const isolatedAuthoredTail =
            pageViewportWidth > 0 &&
            images.length === 1 &&
            wrapper === contents.content.lastElementChild &&
            wrapper?.childElementCount === 1 &&
            !wrapper.textContent?.trim() &&
            isAuthoredCenteredImage(image, contents.window);
        const symmetricWidth = isolatedAuthoredTail
            ? pageViewportWidth -
              2 *
                  Math.max(
                      edgeGuard,
                      getVerticalRlMediaLeftGutter(pageViewportWidth, pageWidth, dpr),
                  )
            : imageWidth;
        fitMaxWidth(
            image,
            contents.window,
            symmetricWidth > 0 ? Math.min(imageWidth, symmetricWidth) : imageWidth,
        );
        const rect = alignedElement.getBoundingClientRect();
        if (!(rect.width > 0) || rect.width > usableWidth + 1) {
            continue;
        }
        if (
            alignedElement.parentElement === contents.content &&
            alignedElement === contents.content.lastElementChild &&
            !alignedElement.textContent?.trim()
        ) {
            fittedMediaDocuments.add(contents.document);
        }
        const offset = origin - rect.right;
        if (offset < -1) {
            continue;
        }
        const page = Math.floor(Math.max(0, offset) / pageWidth);
        if (
            offset + rect.width <= (page + 1) * pageWidth - edgeGuard + 1 &&
            offset >= page * pageWidth + edgeGuard - 1
        ) {
            continue;
        }
        let target = Math.max(offset, page * pageWidth + edgeGuard);
        if (target + rect.width > (page + 1) * pageWidth - edgeGuard + 1) {
            target = (page + 1) * pageWidth + edgeGuard;
        }
        const currentMargin =
            Number.parseFloat(contents.window.getComputedStyle(alignedElement).marginRight) || 0;
        const margin = currentMargin + Math.max(0, target - offset);
        alignedElement.style.setProperty("margin-right", `${margin}px`, "important");
        // Adjacent block margins can collapse, consuming part of the requested gap.
        const remaining = target - (origin - alignedElement.getBoundingClientRect().right);
        if (remaining > 1) {
            alignedElement.style.setProperty(
                "margin-right",
                `${margin + remaining}px`,
                "important",
            );
        }
    }
    if (pageViewportWidth > 0) {
        reserveCenteredMediaTailWindow(contents, pageViewportWidth);
    }
}

/** Keep neighboring text outside an authored centered image's raw page window. */
function reserveCenteredMediaTailWindow(contents: MediaContents, pageViewportWidth: number): void {
    const { document: doc, window: win, content } = contents;
    const tail = content.lastElementChild as HTMLElement | null;
    if (!tail || tail.childElementCount !== 1 || tail.textContent?.trim()) {
        return;
    }
    const image = tail.firstElementChild as HTMLImageElement | null;
    if (image?.tagName !== "IMG") {
        return;
    }
    const style = win.getComputedStyle(tail);
    if (style.position !== "static" || style.transform !== "none") {
        return;
    }
    const media = collectVerticalRlBlockMediaRects(doc, win, pageViewportWidth);
    if (media.length !== 1 || !media[0].centered) {
        return;
    }
    const bounds = media[0];
    const text = collectVisibleTextClientRects(doc, win, content, { minimumTextLength: 1 });
    if (!text?.length || text.length >= 1000 || text.some((rect) => rect.left < bounds.right)) {
        return;
    }
    const nearestText = Math.min(...text.map((rect) => rect.left));
    const centeredRight = (bounds.left + bounds.right + pageViewportWidth) / 2;
    const dpr = win.devicePixelRatio || 1;
    const gap = Math.ceil(Math.max(0, centeredRight + 0.5 / dpr - nearestText) * dpr) / dpr;
    if (!(gap > 0)) {
        return;
    }
    const previous = tail.previousElementSibling;
    const previousMargin = previous
        ? Number.parseFloat(win.getComputedStyle(previous).marginLeft) || 0
        : 0;
    let margin = Math.max(Number.parseFloat(style.marginRight) || 0, previousMargin);
    let remaining = gap;
    // A collapsed neighboring margin can consume the first spacing increment.
    for (let attempt = 0; attempt < 3 && remaining > 0; attempt++) {
        margin += remaining;
        tail.style.setProperty("margin-right", `${margin}px`, "important");
        remaining = gap - (bounds.right - image.getBoundingClientRect().right);
    }
}
