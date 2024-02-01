import { createImage } from "./createImage";

type Props = {
  url: string;
  maxSize: number;
};

export async function resizeImage({ url, maxSize }: Props) {
  const img = await createImage(url);

  let imageUrl;

  const rCanvas = document.createElement("canvas");
  rCanvas.width = img.naturalWidth;
  rCanvas.height = img.naturalHeight;

  // if the image is big resize it
  if (img.naturalHeight > maxSize || img.naturalWidth > maxSize) {
    const wToH = img.naturalWidth / img.naturalHeight;
    rCanvas.width = wToH > 1 ? maxSize : maxSize * wToH;
    rCanvas.height = wToH > 1 ? maxSize / wToH : maxSize;
  }

  const rCtx = rCanvas.getContext("2d");
  rCtx!.drawImage(img, 0, 0, rCanvas.width, rCanvas.height);
  imageUrl = rCanvas.toDataURL("image/png");

  return imageUrl;
}
