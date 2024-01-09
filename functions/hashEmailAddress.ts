export default async function hashEmailAddress(email: string) {
  const msgBuffer = new TextEncoder().encode(email.toLowerCase()); // Convert string to array buffer and lowercase the email
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer); // Hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer)); // Convert buffer to byte array
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(""); // Convert bytes to hex string
  return hashHex;
}
