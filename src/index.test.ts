import { writeFile, writeFileSync } from "fs";
import makePng from "../src/index.ts";
import jsQR from "jsqr";
import sharp from "sharp";

import { expect, test } from "vitest";

let i = 0;
async function scanCode(png: Uint8Array) {
  const { data, info } = await sharp(Buffer.from(png))
    .ensureAlpha()
    .resize(500, 500, {
      kernel: sharp.kernel.nearest,
    })
    .extend({
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
      background: { r: 0xff, g: 0xff, b: 0xff, alpha: 0xff },
    })
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Write the image to a file for manual inspection
  await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  }).toFile(`test${i++}.png`);

  const code = jsQR(
    new Uint8ClampedArray(data.buffer),
    info.width,
    info.height
  );

  return code?.data;
}

test("should make a scannable png", async () => {
  const png = await makePng("hello world");
  expect(await scanCode(png)).toBe("hello world");
});

test("should handle emojis", async () => {
  const png = await makePng("👋🌍");
  expect(await scanCode(png)).toBe("👋🌍");
});

test("should handle numbers", async () => {
  const png = await makePng("1234567890");
  expect(await scanCode(png)).toBe("1234567890");
});

test("should handle special characters", async () => {
  const png = await makePng("!@#$%^&*()_+-=[]{}|;':,./<>?");
  expect(await scanCode(png)).toBe("!@#$%^&*()_+-=[]{}|;':,./<>?");
});

test("should handle empty strings", async () => {
  const png = await makePng("");
  expect(await scanCode(png)).toBe("");
});
