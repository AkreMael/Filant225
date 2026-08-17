
import React from 'react';

interface LinkifyProps {
  text: string;
  className?: string;
}

export const Linkify: React.FC<LinkifyProps> = ({ text, className }) => {
  if (!text || typeof text !== 'string') return <span className={className}>{String(text || '')}</span>;

  // Regex to split by URLs and explicit phone patterns (e.g., 📞 +225 XX XX XX XX XX, +225..., tel:...)
  const combinedRegex = /(https?:\/\/[^\s]+|📞\s*\+?225[\s\d]{8,18}|\+225[\s\d]{8,18})/g;
  const parts = text.split(combinedRegex);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (!part) return null;

        // URL match
        if (part.match(/^https?:\/\/[^\s]+/)) {
          return (
            <a
              key={i}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="underline break-all text-blue-600 hover:opacity-80 transition-opacity font-semibold"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </a>
          );
        }

        // Phone match with 📞 or +225
        if (part.match(/^(📞\s*\+?225[\s\d]{8,18}|\+225[\s\d]{8,18})$/)) {
          const rawDigits = part.replace(/\D/g, '');
          const telUrl = `tel:+${rawDigits.startsWith('225') ? rawDigits : '225' + rawDigits}`;
          return (
            <a
              key={i}
              href={telUrl}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 my-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 rounded-xl font-black text-sm hover:bg-emerald-200 transition-all border border-emerald-300 dark:border-emerald-700 shadow-sm no-underline active:scale-95 cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <span>📞</span>
              <span className="tracking-wide">
                {part.replace('📞', '').trim()}
              </span>
            </a>
          );
        }

        return part;
      })}
    </span>
  );
};
