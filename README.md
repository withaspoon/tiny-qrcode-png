# tiny-qrcode-png

## Who is it for?

Anybody who wants to generate a QR code either server side or client side without too much bloat. The library comes in at around 7kb uncompressed. It is based off https://www.nayuki.io/page/qr-code-generator-library, and comes bundled with a minified version of that library. It generates a monochrome 1-bit PNG.

## Installing

```
# Pick your poison...
npm i tiny-qrcode-png
yarn add tiny-qrcode-png
```

## Usage

The following would produce the QR-code below:

```ts
import makePng from "tiny-qrcode-png";

const png = makePng("Hello, World");
```

![Example PNG](https://raw.github.com/withaspoon/tiny-qrcode-png/main/example.png)
