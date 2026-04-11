'use client';

import * as React from 'react';
import { Play } from 'lucide-react';

import { Button } from '@/features/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/features/components/ui/dialog';

type RelatosVideoDialogProps = {
  youtubeUrl: string;
  triggerLabel?: string;
  dialogTitle?: string;
  dialogDescription?: string;
};

function toYouTubeEmbedUrl(input: string) {
  try {
    const url = new URL(input);

    if (url.hostname === 'youtu.be') {
      const id = url.pathname.replace('/', '');
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : input;
    }

    if (url.hostname.includes('youtube.com')) {
      const v = url.searchParams.get('v');
      if (v) return `https://www.youtube-nocookie.com/embed/${v}`;

      const shortsMatch = url.pathname.match(/\/shorts\/([^/]+)/);
      if (shortsMatch?.[1]) {
        return `https://www.youtube-nocookie.com/embed/${shortsMatch[1]}`;
      }

      const embedMatch = url.pathname.match(/\/embed\/([^/]+)/);
      if (embedMatch?.[1]) {
        return `https://www.youtube-nocookie.com/embed/${embedMatch[1]}`;
      }
    }
  } catch {
    return input;
  }

  return input;
}

export function RelatosVideoDialog({
  youtubeUrl,
  triggerLabel = 'Ver relatos',
  dialogTitle = 'Relatos em vídeo',
  dialogDescription = 'Assista ao vídeo no player abaixo.',
}: RelatosVideoDialogProps) {
  const embedBase = React.useMemo(() => toYouTubeEmbedUrl(youtubeUrl), [youtubeUrl]);

  const embedUrl = React.useMemo(() => {
    return `${embedBase}?rel=0&modestbranding=1&playsinline=1`;
  }, [embedBase]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-full border border-brand-orange/25 bg-brand-orange/10 px-6 font-semibold text-brand-black backdrop-blur-sm transition-colors hover:bg-brand-orange/20"
        >
          <Play className="mr-2 h-4 w-4" />
          {triggerLabel}
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] max-w-3xl overflow-hidden border-none bg-white p-0">
        <DialogHeader className="px-6 pb-2 pt-6">
          <DialogTitle className="text-xl font-bold text-brand-black">{dialogTitle}</DialogTitle>

          <DialogDescription className="text-sm text-gray-500">
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>

        <div className="relative w-full bg-black">
          <div className="pt-[56.25%]" />
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedUrl}
            title={dialogTitle}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
