import { expect, it } from "vite-plus/test";
import Contents from "../../src/contents";

// Numeric Range geometry from the Android Section0024 Engine-only clone.
// No licensed text, Reader policy, or host state is needed to reproduce it.
const columnLefts = [
	346.29547119140625, 359.3636474609375, 317.5, 288.7045593261719,
	-17.25, 245.97727966308594, 217.18182373046875, 188.38636779785156,
	159.59091186523438, 130.7954559326172, 102, 73.20454406738281,
	44.40909194946289, 15.61363697052002, -13.181818962097168,
	-358.3636474609375, -59.97727584838867, -88.7727279663086,
	-116.92613983154297, -123.93182373046875, -152.72727966308594,
	-181.52273559570312, -210.3181915283203, -239.1136474609375,
	-267.9090881347656, -296.7045593261719, -325.5, -354.29547119140625,
	-451.9545593261719, -418.4488830566406, -419.0909118652344,
	-447.8863830566406, -447.8863830566406
];

function measure(translation = 0, scale = 1) {
	const contents = Object.create(Contents.prototype);
	contents.content = {};
	contents.window = {};
	contents.document = {
		createRange: () => ({
			selectNodeContents() {},
			getClientRects: () => columnLefts.map(left => ({
				left: left * scale + translation,
				right: left * scale + translation + 21,
				width: 21,
				height: 100
			}))
		})
	};
	return contents.detectFixedColumnPitch(393.0909118652344);
}

it.each([0.181854248046875, 753.0909118652344, 754.1818542480469, -754.1818542480469])(
	"keeps column pitch invariant when the same source translates by %s CSS pixels",
	translation => {
		const initial = measure();
		const translated = measure(translation);
		expect(initial.stable).toBe(true);
		expect(translated.stable).toBe(true);
		// The measured body-column gaps are approximately28.795 CSS pixels.
		// Translation invariance alone must not admit an under-estimated28.5 pitch.
		expect(initial.linePitch).toBe(29);
		expect(translated.linePitch).toBe(initial.linePitch);
		expect(translated.sampleCount).toBe(initial.sampleCount);
	}
);

it("remeasures a changed column spacing independently of the frame origin", () => {
	expect(measure(754.1818542480469, 1.5).linePitch).not.toBe(measure().linePitch);
});
