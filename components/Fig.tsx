import { dims } from '@/lib/content';

type Props = { src: string; alt?: string; caption?: string; poster?: string; cls?: string; video?: boolean; eager?: boolean };

/** One image or looping video. Renders nothing when the file has not been uploaded yet. */
export default function Fig({ src, alt = '', caption, poster, cls = '', video, eager }: Props) {
  if (!src) return null;
  const isVideo = video || src.endsWith('.mp4');
  const d = dims(isVideo ? poster || '' : src);
  const size = d ? { width: d.w, height: d.h } : {};
  return (
    <figure className={`fig ${cls}`.trim()}>
      {isVideo ? (
        <video autoPlay loop muted playsInline preload="metadata" poster={poster || undefined} aria-label={alt} {...size}>
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" {...size} />
      )}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
