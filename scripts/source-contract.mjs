import ts from "typescript";

const tokenCache = new Map();
function tokens(source) {
    if (tokenCache.has(source)) return tokenCache.get(source);
    const file = ts.createSourceFile("contract.ts", source, ts.ScriptTarget.Latest, true);
    const result = [];
    function visit(node) {
        if (node.kind >= ts.SyntaxKind.FirstJSDocNode && node.kind <= ts.SyntaxKind.LastJSDocNode)
            return;
        const children = node.getChildren(file);
        if (children.length) {
            children.forEach(visit);
            return;
        }
        const token = node.kind;
        if (!node.getText(file)) return;
        if (
            [
                ts.SyntaxKind.EndOfFileToken,
                ts.SyntaxKind.SemicolonToken,
                ts.SyntaxKind.CommaToken,
                ts.SyntaxKind.SyntaxList,
            ].includes(token)
        )
            return;
        if (token === ts.SyntaxKind.StringLiteral) {
            const value = JSON.stringify(node.text);
            result.push(node.isUnterminated ? value.slice(0, -1) : value);
        } else {
            const text = node.getText(file);
            if (/^[^\w$]+$/.test(text) && token !== ts.SyntaxKind.RegularExpressionLiteral)
                result.push(...text.replace(/\s/g, ""));
            else result.push(text);
        }
        result.unterminated = token === ts.SyntaxKind.StringLiteral && node.isUnterminated;
    }
    visit(file);
    for (let index = 0; index < result.length - 1; index++) {
        if (
            result[index + 1] === ":" &&
            result[index].startsWith('"') &&
            result[index].endsWith('"')
        ) {
            result[index] = JSON.parse(result[index]);
        }
    }
    tokenCache.set(source, result);
    return result;
}

// Source contracts verify token sequences, independently of formatter whitespace,
// optional separators, or equivalent string quote styles.
export function sourceIncludes(source, snippet) {
    if (source.includes(snippet)) return true;
    if (typeof source !== "string" || typeof snippet !== "string") return false;
    const actual = tokens(source);
    const expected = tokens(snippet);
    if (expected.length === 0) return false;
    return actual.some((_, start) =>
        expected.every(
            (token, index) =>
                actual[start + index] === token ||
                (index === expected.length - 1 &&
                    expected.unterminated &&
                    actual[start + index]?.startsWith(token)),
        ),
    );
}
