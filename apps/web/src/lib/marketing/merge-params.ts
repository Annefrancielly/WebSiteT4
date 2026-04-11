export function mergeQueryParamsPreservingDestination(
    href: string,
    currentUrl: string
) {
    try {
        const destination = new URL(href);
        const current = new URL(currentUrl);

        // Copia params do tráfego (utm_*, fbclid, gclid etc.) sem sobrescrever o destino.
        current.searchParams.forEach((value, key) => {
            if (!destination.searchParams.has(key)) {
                destination.searchParams.set(key, value);
            }
        });

        return destination.toString();
    } catch {
        return href;
    }
}
