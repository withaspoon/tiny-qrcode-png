import { Ecc, QrCode } from "./qrcodegen.ts";
import makePng from "bw-png-writer";

export default async function makeQrCode(text: string): Promise<Uint8Array> {
  const qr = QrCode._encodeText(text, Ecc._MEDIUM);
  const modules = qr._modules;
  // flip all the bits
  for (let i = 0; i < modules.length; i++) {
    for (let j = 0; j < modules[i].length; j++) {
      modules[i][j] = !modules[i][j];
    }
  }
  return makePng(modules);
}
