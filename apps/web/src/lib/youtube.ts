const YOUTUBE_VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{6,}$/;

function normalizeHostname(hostname: string) {
  return hostname.replace(/^www\./, '');
}

function isValidYouTubeVideoId(videoId: string) {
  return YOUTUBE_VIDEO_ID_PATTERN.test(videoId);
}

export function getYouTubeVideoId(input: string) {
  try {
    const url = new URL(input);
    const hostname = normalizeHostname(url.hostname);

    if (hostname === 'youtu.be') {
      const videoId = url.pathname.split('/').filter(Boolean)[0];

      return videoId && isValidYouTubeVideoId(videoId) ? videoId : null;
    }

    if (
      hostname === 'youtube.com' ||
      hostname === 'm.youtube.com' ||
      hostname === 'youtube-nocookie.com'
    ) {
      const videoIdFromQuery = url.searchParams.get('v');

      if (videoIdFromQuery && isValidYouTubeVideoId(videoIdFromQuery)) {
        return videoIdFromQuery;
      }

      const pathSegments = url.pathname.split('/').filter(Boolean);
      const supportedPathPrefixes = ['embed', 'shorts'];

      if (supportedPathPrefixes.includes(pathSegments[0])) {
        const videoId = pathSegments[1];

        return videoId && isValidYouTubeVideoId(videoId) ? videoId : null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export function toYouTubeEmbedUrl(input: string) {
  const videoId = getYouTubeVideoId(input);

  if (!videoId) {
    return null;
  }

  const searchParams = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });

  return `https://www.youtube-nocookie.com/embed/${videoId}?${searchParams.toString()}`;
}