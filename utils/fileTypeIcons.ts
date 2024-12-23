import { FontAwesome } from "@expo/vector-icons";

export const fileTypeIcons: { [key: string]: keyof typeof FontAwesome.glyphMap } = {
    pdf: "file-pdf-o",
    doc: "file-word-o",
    docx: "file-word-o",
    xls: "file-excel-o",
    xlsx: "file-excel-o",
    ppt: "file-powerpoint-o",
    pptx: "file-powerpoint-o",
    txt: "file-text-o",
    jpg: "file-image-o",
    jpeg: "file-image-o",
    png: "file-image-o",
    gif: "file-image-o",
    mp4: "file-video-o",
    mov: "file-video-o",
    avi: "file-video-o",
    zip: "file-archive-o",
    rar: "file-archive-o",
    // csv: "file-csv",
    json: "file-code-o",
    js: "file-code-o",
    html: "file-code-o",
    css: "file-code-o",
    xml: "file-code-o",
    mp3: "file-audio-o",
    wav: "file-audio-o",
    default: "file-o", // fallback for unknown types
};

/**
 * Function to get the FontAwesome icon name for a given file name.
 * @param fileName - The name of the file (e.g., "document.pdf").
 * @returns The FontAwesome icon name (e.g., "file-pdf-o").
 */
export const getFileIcon = (fileName: string): keyof typeof FontAwesome.glyphMap => {
    if (!fileName || typeof fileName !== "string") {
        return fileTypeIcons.default;
    }

    // Extract the file extension
    const fileExtension = fileName.split(".").pop()?.toLowerCase();

    // Validate the file extension and return the corresponding icon
    return fileExtension && fileTypeIcons[fileExtension]
        ? fileTypeIcons[fileExtension]
        : fileTypeIcons.default;
};

// Example usage
// const attachmentPath = "document.pdf";
// <FontAwesome name={ getFileIcon(attachmentPath) } size = { 24} color = { colors.info } />;
