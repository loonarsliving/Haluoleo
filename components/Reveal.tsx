'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right';
type Delay = 0 | 1 | 2 | 3 | 4;

const DIR_CLASS: Record<Direction, string> = { up: 'rv', left: 'rvl', right: 'rvr' };

export default function Reveal({
  as: Tag = 'div',
  direction = 'up',
  delay = 0,
  className = '',
  style,
  children,
}: {
  as?: keyof React.JSX.IntrinsicElements;
  direction?: Direction;
  delay?: Delay;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const delayClass = delay ? ` d${delay}` : '';
  const classes = `${DIR_CLASS[direction]}${delayClass} ${className}`.trim();

  return (
    // @ts-expect-error dynamic intrinsic tag with shared ref
    <Tag ref={ref} className={classes} style={style}>
      {children}
    </Tag>
  );
}
