export function generateCodeVerifier(): string {
  const array = new Uint8Array(32); // 32 bytes for secure random values
  window.crypto.getRandomValues(array);
  return Array.from(array, (byte) =>
    ("0" + (byte & 0xff).toString(16)).slice(-2)
  ).join("");
}

export async function generateCodeChallenge(
  codeVerifier: string
): Promise<string> {
  // Encode verifier as Uint8Array
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);

  // Create a SHA256 hash of the code verifier
  const digest = await crypto.subtle.digest("SHA-256", data);

  // Convert the value to base64url format
  const base64Digest = btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  return base64Digest;
}
