export function normalizeImagePath(fullPath: string): string {

    const index = fullPath.indexOf('public');
    if (index === -1) return fullPath;
    return normalizePathToSystem(fullPath.substring(index + 'public'.length))
};

export function normalizePathToSystem(path: string): string {
    return path.split('/').map(segment => encodeURIComponent(segment)).join('/');
}