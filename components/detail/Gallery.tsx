'use client';

import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import styles from './Gallery.module.css';

type GalleryImage = { url: string; caption: string | null; display_order: number };

export default function Gallery({ slug }: { slug: string }) {
  const [images, setImages] = useState<GalleryImage[] | null>(null);
  const [error, setError] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    supabase
      .from('project_images')
      .select('url,caption,display_order')
      .eq('project_slug', slug)
      .order('display_order', { ascending: true })
      .then(({ data, error: err }) => {
        if (cancelled) return;
        if (err) { setError(true); return; }
        setImages(data ?? []);
      });
    return () => { cancelled = true; };
  }, [slug]);

  const close = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(
    () => setLightboxIndex((i) => (i === null || !images ? i : (i - 1 + images.length) % images.length)),
    [images]
  );
  const next = useCallback(
    () => setLightboxIndex((i) => (i === null || !images ? i : (i + 1) % images.length)),
    [images]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, close, prev, next]);

  if (error) return <div className={styles.loading}>Gagal memuat galeri.</div>;
  if (images === null) return <div className={styles.loading}>⏳ Memuat galeri...</div>;
  if (images.length === 0) return <div className={styles.loading}>Belum ada foto.</div>;

  return (
    <>
      <div className={styles.grid}>
        {images.map((img, i) => (
          <button key={img.url + i} type="button" className={styles.item} onClick={() => setLightboxIndex(i)}>
            {/* eslint-disable-next-line @next/next/no-img-element -- dynamic Supabase Storage URLs */}
            <img src={img.url} alt={img.caption ?? ''} loading="lazy" />
          </button>
        ))}
      </div>
      {lightboxIndex !== null && (
        <div className={styles.lightbox} onClick={close}>
          <button className={styles.lbClose} onClick={(e) => { e.stopPropagation(); close(); }}>✕</button>
          <button className={styles.lbPrev} onClick={(e) => { e.stopPropagation(); prev(); }}>‹</button>
          {/* eslint-disable-next-line @next/next/no-img-element -- dynamic Supabase Storage URLs */}
          <img src={images[lightboxIndex].url} alt={images[lightboxIndex].caption ?? ''} onClick={(e) => e.stopPropagation()} />
          <button className={styles.lbNext} onClick={(e) => { e.stopPropagation(); next(); }}>›</button>
          {images[lightboxIndex].caption && <div className={styles.lbCap}>{images[lightboxIndex].caption}</div>}
        </div>
      )}
    </>
  );
}
