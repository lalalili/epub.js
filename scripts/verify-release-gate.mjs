import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));
const ciWorkflow = readFileSync(path.join(root, ".github/workflows/ci.yml"), "utf8");
const readme = readFileSync(path.join(root, "README.md"), "utf8");

const requiredReleaseSteps = [
	"npm run lint",
	"npm run typecheck",
	"npm run compile",
	"npm run build",
	"npm run docs:md",
	"npm run verify:contracts",
	"npm run test:browser",
	"npm audit",
	"npm audit --omit=dev",
	"npm pack --dry-run"
];

function assert(condition, message) {
	if (!condition) {
		throw new Error(message);
	}
}

const verifyRelease = packageJson.scripts["verify:release"];

assert(verifyRelease, "verify:release script must exist");

const releaseSteps = verifyRelease.split("&&").map((step) => step.trim());

assert(
	JSON.stringify(releaseSteps) === JSON.stringify(requiredReleaseSteps),
	"verify:release must exactly match the canonical release gate steps"
);

for (const requiredStep of requiredReleaseSteps) {
	assert(
		verifyRelease.includes(requiredStep),
		`verify:release must include ${requiredStep}`
	);
}

for (let index = 1; index < requiredReleaseSteps.length; index += 1) {
	const previousStep = requiredReleaseSteps[index - 1];
	const currentStep = requiredReleaseSteps[index];

	assert(
		verifyRelease.indexOf(previousStep) < verifyRelease.indexOf(currentStep),
		`verify:release must run ${previousStep} before ${currentStep}`
	);
}

assert(
	ciWorkflow.includes("run: npm run verify:release"),
	"CI workflow must run the shared verify:release gate"
);
assert(
	!ciWorkflow.includes("npm run verify:contracts"),
	"CI workflow must not duplicate contract steps outside verify:release"
);
assert(
	readme.includes("npm run verify:release"),
	"README release checklist must document npm run verify:release"
);
assert(
	readme.includes("final `npm pack\n--dry-run` lifecycle check"),
	"README must document the final npm pack --dry-run lifecycle check"
);

console.log("Release gate wiring contract verified.");
