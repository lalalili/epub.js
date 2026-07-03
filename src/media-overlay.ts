export interface SmilTextNode {
	src: string;
	href: string;
}

export interface SmilAudioNode {
	src: string;
	href: string;
	clipBegin: string;
	clipEnd: string;
}

export interface SmilFragment {
	id: string;
	text: SmilTextNode | null;
	audio: SmilAudioNode | null;
	sequencePath: string[];
}

export interface SmilSequence {
	id: string;
	textref: string;
	textrefHref: string;
	children: Array<SmilSequence | SmilFragment>;
	fragments: SmilFragment[];
}

export interface SmilDocument {
	href: string;
	sequences: SmilSequence[];
	fragments: SmilFragment[];
}

export interface ParseSmilOptions {
	href?: string;
}

interface XmlTreeNode {
	name: string;
	attributes: Record<string, string>;
	children: XmlTreeNode[];
}

const normalizeString = (value: unknown): string => {
	return typeof value === "string" ? value.trim() : "";
};

const isExternalHref = (href: string): boolean => {
	return /^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("//");
};

export const resolveSmilHref = (baseHref = "", href = ""): string => {
	const normalizedHref = normalizeString(href);
	if (!normalizedHref || isExternalHref(normalizedHref)) {
		return normalizedHref;
	}

	const [path, fragment = ""] = normalizedHref.split("#");
	const basePath = normalizeString(baseHref).split("#")[0].split("?")[0];
	const baseDir = basePath.includes("/") ? basePath.slice(0, basePath.lastIndexOf("/") + 1) : "";
	const segments = `${baseDir}${path}`.split("/");
	const resolved: string[] = [];

	for (const segment of segments) {
		if (!segment || segment === ".") {
			continue;
		}

		if (segment === "..") {
			resolved.pop();
			continue;
		}

		resolved.push(segment);
	}

	return `${resolved.join("/")}${fragment ? `#${fragment}` : ""}`;
};

const normalizeTagName = (name = ""): string => {
	return normalizeString(name).split(":").pop()?.toLowerCase() ?? "";
};

const parseAttributes = (attributeSource = ""): Record<string, string> => {
	const attributes: Record<string, string> = {};
	const pattern = /([\w:.-]+)\s*=\s*("([^"]*)"|'([^']*)')/g;
	let match = pattern.exec(attributeSource);

	while (match) {
		attributes[match[1]] = match[3] ?? match[4] ?? "";
		match = pattern.exec(attributeSource);
	}

	return attributes;
};

const parseXmlFallback = (xml = ""): XmlTreeNode => {
	const root: XmlTreeNode = { name: "root", attributes: {}, children: [] };
	const stack: XmlTreeNode[] = [root];
	const pattern = /<\s*(\/)?\s*([\w:.-]+)([^>]*?)(\/)?\s*>/g;
	let match = pattern.exec(xml);

	while (match) {
		const [, closing, rawName, rawAttributes, selfClosing] = match;
		const name = normalizeTagName(rawName);

		if (closing) {
			while (stack.length > 1 && stack[stack.length - 1].name !== name) {
				stack.pop();
			}

			if (stack.length > 1) {
				stack.pop();
			}

			match = pattern.exec(xml);
			continue;
		}

		const node: XmlTreeNode = {
			name,
			attributes: parseAttributes(rawAttributes),
			children: []
		};
		stack[stack.length - 1].children.push(node);

		if (!selfClosing) {
			stack.push(node);
		}

		match = pattern.exec(xml);
	}

	return root;
};

const domNodeToTree = (node: Element | null): XmlTreeNode | null => {
	if (!node) {
		return null;
	}

	const attributes: Record<string, string> = {};
	for (const attribute of Array.from(node.attributes ?? [])) {
		attributes[attribute.name] = attribute.value;
	}

	return {
		name: normalizeTagName(node.localName || node.nodeName),
		attributes,
		children: Array.from(node.children ?? [])
			.map(domNodeToTree)
			.filter((child): child is XmlTreeNode => Boolean(child))
	};
};

const parseXml = (xml = ""): XmlTreeNode => {
	if (typeof DOMParser === "function") {
		const document = new DOMParser().parseFromString(xml, "application/xml");
		const parseError = document.querySelector("parsererror");
		const tree = parseError ? null : domNodeToTree(document.documentElement);

		if (tree) {
			return tree;
		}
	}

	return parseXmlFallback(xml);
};

const findFirst = (node: XmlTreeNode | null, name: string): XmlTreeNode | null => {
	if (!node) {
		return null;
	}

	if (node.name === name) {
		return node;
	}

	for (const child of node.children) {
		const found = findFirst(child, name);
		if (found) {
			return found;
		}
	}

	return null;
};

const childElements = (node: XmlTreeNode | null, name: string): XmlTreeNode[] => {
	return (node?.children ?? []).filter((child) => child.name === name);
};

const normalizeTextNode = (node: XmlTreeNode | undefined, smilHref: string): SmilTextNode | null => {
	if (!node) {
		return null;
	}

	const src = normalizeString(node.attributes.src);
	return {
		src,
		href: resolveSmilHref(smilHref, src)
	};
};

const normalizeAudioNode = (node: XmlTreeNode | undefined, smilHref: string): SmilAudioNode | null => {
	if (!node) {
		return null;
	}

	const src = normalizeString(node.attributes.src);
	return {
		src,
		href: resolveSmilHref(smilHref, src),
		clipBegin: normalizeString(node.attributes.clipBegin),
		clipEnd: normalizeString(node.attributes.clipEnd)
	};
};

const normalizePar = (node: XmlTreeNode, smilHref: string, sequencePath: string[]): SmilFragment => {
	const text = normalizeTextNode(childElements(node, "text")[0], smilHref);
	const audio = normalizeAudioNode(childElements(node, "audio")[0], smilHref);

	return {
		id: normalizeString(node.attributes.id),
		text,
		audio,
		sequencePath
	};
};

const normalizeSeq = (node: XmlTreeNode, smilHref: string, sequencePath: string[] = []): SmilSequence => {
	const currentPath = [...sequencePath, normalizeString(node.attributes.id)].filter(Boolean);
	const textref = normalizeString(node.attributes["epub:textref"] ?? node.attributes.textref);
	const children: Array<SmilSequence | SmilFragment> = [];
	const fragments: SmilFragment[] = [];

	for (const child of node.children) {
		if (child.name === "seq") {
			const sequence = normalizeSeq(child, smilHref, currentPath);
			children.push(sequence);
			fragments.push(...sequence.fragments);
			continue;
		}

		if (child.name === "par") {
			const fragment = normalizePar(child, smilHref, currentPath);
			children.push(fragment);
			fragments.push(fragment);
		}
	}

	return {
		id: normalizeString(node.attributes.id),
		textref,
		textrefHref: resolveSmilHref(smilHref, textref),
		children,
		fragments
	};
};

export const parseSmilDocument = (xml = "", options: ParseSmilOptions = {}): SmilDocument => {
	const href = normalizeString(options.href);
	const tree = parseXml(xml);
	const body = findFirst(tree, "body") ?? tree;
	const sequences = childElements(body, "seq").map((seq) => normalizeSeq(seq, href));
	const bodyFragments = childElements(body, "par").map((par) => normalizePar(par, href, []));
	const fragments = [
		...sequences.flatMap((sequence) => sequence.fragments),
		...bodyFragments
	];

	return {
		href,
		sequences,
		fragments
	};
};

export const parseSmilClock = (value: unknown): number | null => {
	const source = normalizeString(value).replace(/^npt=/i, "");
	if (!source) {
		return null;
	}

	const unitMatch = source.match(/^([0-9]+(?:\.[0-9]+)?)(h|min|s|ms)$/i);
	if (unitMatch) {
		const amount = Number(unitMatch[1]);
		if (!Number.isFinite(amount)) {
			return null;
		}

		const unit = unitMatch[2].toLowerCase();
		if (unit === "h") {
			return amount * 3600;
		}

		if (unit === "min") {
			return amount * 60;
		}

		if (unit === "ms") {
			return amount / 1000;
		}

		return amount;
	}

	if (/^[0-9]+(?:\.[0-9]+)?$/.test(source)) {
		const seconds = Number(source);
		return Number.isFinite(seconds) ? seconds : null;
	}

	const parts = source.split(":");
	if (parts.length < 2 || parts.length > 3) {
		return null;
	}

	const values = parts.map((part) => Number(part));
	if (values.some((part) => !Number.isFinite(part))) {
		return null;
	}

	const [hours, minutes, seconds] = parts.length === 3 ? values : [0, ...values];
	return hours * 3600 + minutes * 60 + seconds;
};
