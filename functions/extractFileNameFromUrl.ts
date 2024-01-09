export default function extractFileNameFromURL(downloadURL: string) {
  try {
    // Create a URL object from the download URL
    const urlObj = new URL(downloadURL);

    // Extract the 'url' query parameter
    const fileURL = urlObj.searchParams.get("url");

    if (!fileURL) {
      throw new Error("URL parameter not found");
    }

    // Decode the file URL
    const decodedFileURL = decodeURIComponent(fileURL);

    // Create a URL object from the decoded file URL
    const fileUrlObj = new URL(decodedFileURL);

    // Extract the pathname and split it to get the filename
    const pathname = fileUrlObj.pathname;
    const filename = pathname.split("/").pop();

    return decodeURIComponent(filename as string);
  } catch (error) {
    console.error("Error extracting filename:", error);
    return null;
  }
}
