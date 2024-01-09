export const createImage = (
  url: string,
  bypassCORS = false
): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
    if (bypassCORS) {
      image.src = `${url}?abchys=csuiqp`;
    } else {
      image.src = url;
    }
    image.crossOrigin = "anonymous";
  });
