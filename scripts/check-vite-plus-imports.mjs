import { readdirSync, readFileSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { preferVitePlusImportsRule } from "vite-plus/oxlint-plugin";

const require = createRequire(import.meta.url);
let vue;
let babel;
try {
    vue = require("vue/compiler-sfc");
} catch {
    babel = require("@babel/core");
}

// Run the bundled rule on ordinary ESTree nodes, avoiding OXC's fixed-size
// JS-plugin allocator on constrained runners. No import policy is disabled.
export function inspectModuleImports(source, filename) {
    const plugins = ["estree"];
    if (/\.(?:[cm]?ts|tsx|vue)$/.test(filename))
        plugins.push(["typescript", { dts: filename.endsWith(".d.ts") }]);
    if (/\.[jt]sx$/.test(filename)) plugins.push("jsx");
    const options = { sourceType: "module", plugins, createImportExpressions: true };
    const ast = vue
        ? vue.babelParse(source, options)
        : babel.parseSync(source, { babelrc: false, configFile: false, parserOpts: options });
    const findings = [];
    const visitors = preferVitePlusImportsRule.createOnce({
        filename,
        report({ node, data }) {
            findings.push({
                filename,
                line: node.loc?.start.line ?? 1,
                from: data.from,
                to: data.to,
            });
        },
    });
    function visit(node) {
        if (!node || typeof node !== "object") return;
        if (Array.isArray(node)) {
            node.forEach(visit);
            return;
        }
        // Babel and OXC use different names for this literal node.
        if (node.type === "TSImportType" && !node.source) node.source = node.argument;
        visitors[node.type]?.(node);
        for (const [key, value] of Object.entries(node)) {
            if (!["loc", "start", "end", "comments", "tokens", "source"].includes(key))
                visit(value);
        }
    }
    visit(ast);
    return findings;
}

export function assertVitePlusImports(root, scopes) {
    const files = [];
    function collect(file) {
        if (statSync(file).isDirectory()) {
            for (const entry of readdirSync(file)) collect(path.join(file, entry));
        } else if (/\.(?:[cm]?[jt]s|[jt]sx|vue)$/.test(file)) files.push(file);
    }
    scopes.forEach((scope) => collect(path.join(root, scope)));
    if (!files.length) throw new Error("Import policy must inspect source files.");
    const findings = [];
    for (const file of files) {
        const source = readFileSync(file, "utf8");
        if (file.endsWith(".vue")) {
            if (!vue) throw new Error("Vue compiler is required for SFC import checks.");
            const { descriptor, errors } = vue.parse(source, { filename: file });
            if (errors.length) throw new Error(`Cannot parse ${file}`);
            for (const script of [descriptor.script, descriptor.scriptSetup].filter(Boolean))
                findings.push(...inspectModuleImports(script.content, file));
        } else findings.push(...inspectModuleImports(source, file));
    }
    if (findings.length)
        throw new Error(
            findings
                .map(
                    (f) =>
                        `${path.relative(root, f.filename)}:${f.line}: Use ${f.to} instead of ${f.from}`,
                )
                .join("\n"),
        );
    console.log(`Vite Plus import policy: ${files.length} source files checked.`);
}
