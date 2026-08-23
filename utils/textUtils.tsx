
import React from 'react';

interface LinkifyProps {
  text: string;
  className?: string;
}

export const Linkify: React.FC<LinkifyProps> = ({ text, className }) => {
  if (!text || typeof text !== 'string') return <span className={className}>{String(text || '')}</span>;

  // Regex to split by URLs
  const combinedRegex = /(https?:\/\/[^\s]+)/g;
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

        return part;
      })}
    </span>
  );
};
