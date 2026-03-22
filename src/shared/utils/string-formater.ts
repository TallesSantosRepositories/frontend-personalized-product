export function normalizeImagePath(fullPath: string): string {

    const index = fullPath.indexOf('public');
    if (index === -1) return fullPath;
    return fullPath.substring(index + 'public'.length)
}; 