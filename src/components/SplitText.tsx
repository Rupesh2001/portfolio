import { useMemo } from 'react';

type SplitTextProps = {
  text: string;
  className?: string;
};

export function SplitText({ text, className = '' }: SplitTextProps) {
  const letters = useMemo(() => Array.from(text), [text]);

  return (
    <span className={`split-text ${className}`.trim()} aria-label={text}>
      {letters.map((letter, index) => (
        <span key={`${letter}-${index}`} className="split-letter" style={{ ['--delay' as string]: `${index * 0.03}s` }}>
          {letter === ' ' ? '\u00A0' : letter}
        </span>
      ))}
    </span>
  );
}
