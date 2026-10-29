export const clearUrlVideo = (url: string | undefined | null): string => {
    if (!url) return '';

    const trimmedUrl = url.trim();
    const youtubeRegex =
        /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;

    const match = trimmedUrl.match(youtubeRegex);

    if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }

    return trimmedUrl;
};
