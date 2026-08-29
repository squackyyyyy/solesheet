import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicWebDirectory = path.resolve("public/web");
const faviconSource = await readFile(
	path.join(publicWebDirectory, "favicon.svg"),
);
const appMarkSource = await readFile(
	path.resolve("public/svg/solesheet-mark-on-dark.svg"),
);

const faviconTargets = [
	[16, "favicon-16.png"],
	[32, "favicon-32.png"],
	[48, "favicon-48.png"],
];
const appIconTargets = [
	[180, "apple-touch-icon.png"],
	[192, "icon-192.png"],
	[512, "icon-512.png"],
];

for (const [size, filename] of faviconTargets) {
	await sharp(faviconSource, { density: 384 })
		.resize(size, size, { fit: "fill" })
		.png()
		.toFile(path.join(publicWebDirectory, filename));
}

const appIconSource = await sharp({
	create: {
		width: 512,
		height: 512,
		channels: 4,
		background: "#14213D",
	},
})
	.composite([{ input: appMarkSource }])
	.png()
	.toBuffer();

for (const [size, filename] of appIconTargets) {
	await sharp(appIconSource)
		.resize(size, size, { fit: "fill" })
		.png()
		.toFile(path.join(publicWebDirectory, filename));
}

const icoSizes = [16, 32, 48];
const icoImages = await Promise.all(
	icoSizes.map((size) =>
		readFile(path.join(publicWebDirectory, `favicon-${size}.png`)),
	),
);
const icoHeaderSize = 6;
const icoEntrySize = 16;
const icoHeader = Buffer.alloc(icoHeaderSize + icoEntrySize * icoImages.length);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(icoImages.length, 4);

let imageOffset = icoHeader.length;
for (const [index, image] of icoImages.entries()) {
	const entryOffset = icoHeaderSize + index * icoEntrySize;
	const size = icoSizes[index];
	icoHeader.writeUInt8(size, entryOffset);
	icoHeader.writeUInt8(size, entryOffset + 1);
	icoHeader.writeUInt8(0, entryOffset + 2);
	icoHeader.writeUInt8(0, entryOffset + 3);
	icoHeader.writeUInt16LE(1, entryOffset + 4);
	icoHeader.writeUInt16LE(32, entryOffset + 6);
	icoHeader.writeUInt32LE(image.length, entryOffset + 8);
	icoHeader.writeUInt32LE(imageOffset, entryOffset + 12);
	imageOffset += image.length;
}

const ico = Buffer.concat([icoHeader, ...icoImages]);
await Promise.all([
	writeFile(path.join(publicWebDirectory, "favicon.ico"), ico),
	writeFile(path.resolve("public/favicon.ico"), ico),
]);

console.log("Generated SoleSheet shoe favicon assets.");
