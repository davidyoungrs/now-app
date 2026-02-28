import { put } from '@vercel/blob';

/**
 * Uploads a base64 encoded image to Vercel Blob storage.
 * @param base64Data The raw base64 string (without the data:image/... prefix).
 * @param filename The desired filename in the Blob store.
 * @param mimeType The MIME type of the image (e.g., 'image/jpeg', 'image/png').
 * @returns The public URL of the uploaded image.
 */
export async function uploadImageToBlob(
    base64Data: string,
    filename: string,
    mimeType: string = "image/jpeg"
): Promise<string> {
    // If no token is provided in env, return base64 instead of crashing
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        console.warn("Vercel Blob token not found in environment variables. Falling back to storing Base64.");
        return `data:${mimeType};base64,${base64Data}`;
    }

    try {
        const buffer = Buffer.from(base64Data, "base64");

        // Upload standard buffer to Vercel Blob with public access
        const { url } = await put(filename, buffer, {
            access: 'public',
            contentType: mimeType,
        });

        return url;
    } catch (error) {
        console.error("Error uploading to Vercel Blob:", error);
        throw error;
    }
}
